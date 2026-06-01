import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { logger } from "../lib/logger";

const DATA_DIR = path.resolve(process.cwd(), "data");
const STATE_FILE = path.join(DATA_DIR, "bot-state.json");

interface DayRating {
  total: number;
  count: number;
  voters: string[];
}

interface BotState {
  day: number;
  lastPosted: string | null;
  activeChannels: string[];
  lastRecipeTitle: string | null;
  ratings: Record<string, DayRating>;
  recipeTitles: Record<string, string>;
}

const DEFAULT_STATE: BotState = {
  day: 0,
  lastPosted: null,
  activeChannels: [],
  lastRecipeTitle: null,
  ratings: {},
  recipeTitles: {},
};

async function readState(): Promise<BotState> {
  try {
    const content = await readFile(STATE_FILE, "utf-8");
    const parsed = JSON.parse(content) as Partial<BotState>;
    return {
      day: parsed.day ?? 0,
      lastPosted: parsed.lastPosted ?? null,
      activeChannels: parsed.activeChannels ?? [],
      lastRecipeTitle: parsed.lastRecipeTitle ?? null,
      ratings: parsed.ratings ?? {},
      recipeTitles: parsed.recipeTitles ?? {},
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

async function saveState(state: BotState): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    logger.error({ err }, "Failed to save bot state");
  }
}

export async function shouldPostToday(): Promise<boolean> {
  const state = await readState();
  if (!state.lastPosted) return true;
  const lastPosted = new Date(state.lastPosted);
  const now = new Date();
  const hoursSince = (now.getTime() - lastPosted.getTime()) / (1000 * 60 * 60);
  return hoursSince >= 23;
}

export async function getNextDay(): Promise<number> {
  const state = await readState();
  return state.day + 1;
}

export async function getCurrentDay(): Promise<number> {
  const state = await readState();
  return state.day;
}

export async function markPosted(day: number, recipeTitle?: string): Promise<void> {
  const state = await readState();
  const recipeTitles = { ...state.recipeTitles };
  if (recipeTitle) recipeTitles[String(day)] = recipeTitle;
  await saveState({
    ...state,
    day,
    lastPosted: new Date().toISOString(),
    lastRecipeTitle: recipeTitle ?? state.lastRecipeTitle,
    recipeTitles,
  });
}

export async function getActiveChannels(): Promise<string[]> {
  const state = await readState();
  return state.activeChannels;
}

export async function addChannel(channelId: string): Promise<boolean> {
  const state = await readState();
  if (state.activeChannels.includes(channelId)) return false;
  state.activeChannels.push(channelId);
  await saveState(state);
  return true;
}

export async function removeChannel(channelId: string): Promise<boolean> {
  const state = await readState();
  const idx = state.activeChannels.indexOf(channelId);
  if (idx === -1) return false;
  state.activeChannels.splice(idx, 1);
  await saveState(state);
  return true;
}

export interface TopEntry {
  day: number;
  title: string;
  average: number;
  count: number;
}

export async function getTopRatedRecipes(limit = 10): Promise<TopEntry[]> {
  const state = await readState();
  const entries: TopEntry[] = Object.entries(state.ratings)
    .filter(([, r]) => r.count >= 1)
    .map(([dayKey, r]) => ({
      day: Number(dayKey),
      title: `Receta del día ${dayKey}`,
      average: r.total / r.count,
      count: r.count,
    }));

  return entries.sort((a, b) => b.average - a.average || b.count - a.count).slice(0, limit);
}

export async function getTopRatedRecipesWithTitles(limit = 10): Promise<TopEntry[]> {
  const state = await readState();
  const entries: TopEntry[] = Object.entries(state.ratings)
    .filter(([, r]) => r.count >= 1)
    .map(([dayKey, r]) => ({
      day: Number(dayKey),
      title: state.recipeTitles[dayKey] ?? `Receta del día ${dayKey}`,
      average: r.total / r.count,
      count: r.count,
    }));

  return entries.sort((a, b) => b.average - a.average || b.count - a.count).slice(0, limit);
}

export interface RatingResult {
  alreadyVoted: boolean;
  average: number;
  count: number;
  recipeTitle: string | null;
  day: number;
}

export async function addRating(
  userId: string,
  stars: number,
): Promise<RatingResult> {
  const state = await readState();
  const day = state.day;
  const key = String(day);

  if (!state.ratings[key]) {
    state.ratings[key] = { total: 0, count: 0, voters: [] };
  }

  const dayRating = state.ratings[key];

  if (dayRating.voters.includes(userId)) {
    const average = dayRating.count > 0 ? dayRating.total / dayRating.count : 0;
    return {
      alreadyVoted: true,
      average,
      count: dayRating.count,
      recipeTitle: state.lastRecipeTitle,
      day,
    };
  }

  dayRating.total += stars;
  dayRating.count += 1;
  dayRating.voters.push(userId);
  await saveState(state);

  return {
    alreadyVoted: false,
    average: dayRating.total / dayRating.count,
    count: dayRating.count,
    recipeTitle: state.lastRecipeTitle,
    day,
  };
}
