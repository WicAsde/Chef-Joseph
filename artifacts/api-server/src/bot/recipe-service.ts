import { logger } from "../lib/logger";

export interface FormattedRecipe {
  title: string;
  area: string;
  category: string;
  thumbnail: string;
  youtube: string;
  source: string;
  ingredients: string[];
  steps: string[];
  glutenFreeVariant: string;
  veganVariant: string;
  allergens: string[];
}

// ── Spanish recipe catalogue ──────────────────────────────────────────────────

interface RecipeData {
  title: string;
  area: string;
  category: string;
  ingredients: string[];
  steps: string[];
  glutenSubs: string | null;
  veganSubs: string | null;
  allergens: string[];
}

const RECIPES: RecipeData[] = [
  {
    title: "Caldo de Pollo Casero",
    area: "España",
    category: "Sopas y caldos",
    ingredients: [
      "1 pollo entero o carcasas (800g)",
      "2 zanahorias grandes",
      "2 ramas de apio",
      "1 puerro entero",
      "1 cebolla",
      "3 dientes de ajo",
      "2 hojas de laurel",
      "1 ramita de perejil",
      "1 cs de sal gruesa por litro de agua",
      "Agua fría (hasta cubrir todo)",
      "Fideos finos o arroz (opcional para servir)",
    ],
    steps: [
      "Pon todos los ingredientes en una olla grande y cúbrelos con agua fría. Es importante empezar con agua fría para extraer bien el colágeno y el sabor de los huesos.",
      "Lleva a ebullición a fuego medio-alto. Cuando rompa a hervir, verás que sube una espuma grisácea: retírala con una cuchara o espumadera. Esto es fundamental para un caldo limpio y claro.",
      "Baja el fuego al mínimo. El caldo debe 'temblar' suavemente, nunca hervir a borbotones. Cocina así durante 1 hora y 30 minutos tapado.",
      "Prueba de sal a la hora y ajusta si es necesario. Añade pimienta negra en grano si la tienes.",
      "Apaga el fuego y deja reposar tapado 20 minutos. El reposo mejora mucho el sabor.",
      "Cuela el caldo con un colador fino. Reserva la carne de pollo (desmenúzala, está riquísima). Las verduras ya han dado todo su sabor y se pueden desechar o comer.",
      "Para servir: calienta el caldo colado, añade fideos finos y cocínalos 3 minutos. Sirve con la carne desmenuzada y unas gotas de limón si gustas.",
    ],
    glutenSubs:
      "• ~~Fideos de trigo~~ → **fideos de arroz o vermicelli de arroz**\n" +
      "• El resto de ingredientes son naturalmente sin gluten.\n\n" +
      "⚠️ *Si usas cubito de caldo en algún momento, revisa que sea etiquetado sin gluten.*",
    veganSubs:
      "• ~~Pollo~~ → **400g de setas (shiitake + champiñones) + 1 ramita de romero**\n" +
      "• Añade también **1 trozo de alga kombu** para dar profundidad de sabor umami.\n" +
      "• El proceso es igual: agua fría, llevar a ebullición, espumar y cocer 45 minutos.\n\n" +
      "💡 *El caldo de setas con kombu es sorprendentemente sabroso y muy rico en minerales.*",
    allergens: [],
  },
  {
    title: "Tortilla Española",
    area: "España",
    category: "Huevos y tortillas",
    ingredients: [
      "6 huevos grandes",
      "600g de patatas (tipo monalisa o similar)",
      "1 cebolla mediana (opcional pero recomendada)",
      "150ml de aceite de oliva virgen extra",
      "Sal al gusto",
    ],
    steps: [
      "Pela y corta las patatas en láminas finas de unos 3mm o en dados pequeños. Pela y corta la cebolla en juliana fina. Mezcla ambas con una pizca de sal.",
      "Calienta el aceite en una sartén amplia a fuego medio. Añade las patatas y la cebolla. No deben freírse, sino 'confitarse': el fuego debe ser suave para que se ablanden sin dorarse. Cocina 20-25 minutos removiendo de vez en cuando.",
      "Bate los huevos en un bol grande con una pizca de sal hasta que estén bien integrados.",
      "Escurre las patatas con una espumadera (reserva el aceite) y mézclalas directamente con los huevos batidos. Deja reposar la mezcla 5 minutos para que los huevos empiecen a cuajar un poco con el calor de las patatas.",
      "En la misma sartén con apenas 2 cucharadas del aceite reservado a fuego medio-alto, vierte la mezcla. Mueve la sartén en círculos para que no se pegue. Cuando los bordes empiecen a cuajar (2-3 minutos) es el momento de dar la vuelta.",
      "Cubre la sartén con un plato plano más grande que ella. En un movimiento rápido y decidido, dale la vuelta (la tortilla quedará en el plato). Desliza la tortilla de vuelta a la sartén por el lado sin cuajar. Cocina 2 minutos más.",
      "Repite el volteo si quieres el centro más cuajado. La tortilla perfecta queda jugosa por dentro (con el huevo apenas cuajado). Sirve caliente o a temperatura ambiente.",
    ],
    glutenSubs:
      "✅ La tortilla española es **naturalmente sin gluten**. Todos los ingredientes (huevo, patata, cebolla, aceite) son libres de gluten.\n\n" +
      "⚠️ *Solo verifica que el aceite de oliva no esté contaminado cruzado si es muy sensible.*",
    veganSubs:
      "• ~~6 huevos~~ → **400ml de aquafaba** (líquido del bote de garbanzos) + **2 cs de harina de garbanzo** + **1 ct de cúrcuma** (para el color)\n" +
      "• Bate el aquafaba con la harina y la cúrcuma hasta que esté espumoso.\n" +
      "• El proceso de patatas y cebolla es idéntico.\n\n" +
      "💡 *La aquafaba cuaja sorprendentemente bien. La textura es diferente pero muy rica.*",
    allergens: ["🥚 Huevo"],
  },
  {
    title: "Lentejas Estofadas con Chorizo",
    area: "España",
    category: "Legumbres",
    ingredients: [
      "400g de lentejas pardinas (sin remojo previo)",
      "2 chorizos frescos o curados",
      "1 cebolla grande",
      "2 dientes de ajo",
      "1 pimiento rojo",
      "2 zanahorias",
      "2 tomates maduros (o 200g de tomate triturado)",
      "1 hoja de laurel",
      "1 ct de pimentón dulce o ahumado",
      "3 cs de aceite de oliva",
      "Sal y pimienta al gusto",
      "Agua o caldo (600-700ml)",
    ],
    steps: [
      "Pica la cebolla, el ajo, el pimiento y las zanahorias en dados medianos. Ralla o tritura los tomates. Corta el chorizo en rodajas.",
      "En una olla o cazuela grande, calienta el aceite a fuego medio. Sofríe la cebolla y el ajo hasta que estén transparentes (5 min). Añade el pimiento y la zanahoria, cocina 5 minutos más.",
      "Añade el tomate triturado y el pimentón. Remueve bien y cocina 3 minutos hasta que el tomate pierda el agua y se concentre.",
      "Incorpora el chorizo en rodajas y saltea 2 minutos. El chorizo soltará su grasa y aceite rojo que dará color a todo el guiso.",
      "Añade las lentejas (enjuagadas), la hoja de laurel y cubre con agua o caldo. La regla es: el líquido debe superar las lentejas en 2 dedos.",
      "Lleva a ebullición, luego baja a fuego medio-bajo y cocina 25-30 minutos. Las lentejas pardinas no necesitan remojo. Si se quedan sin líquido, añade agua caliente (nunca fría, corta la cocción).",
      "A los 25 minutos, pincha una lenteja para comprobar: debe estar tierna pero entera, no deshecha. Rectifica de sal. Deja reposar 5 minutos antes de servir.",
    ],
    glutenSubs:
      "• ~~Chorizo comercial~~ → **chorizo artesanal certificado sin gluten** (algunos chorizos llevan trazas de gluten en sus rellenos)\n" +
      "• El resto de ingredientes son naturalmente sin gluten.\n\n" +
      "⚠️ *Lee siempre la etiqueta del chorizo y del pimentón envasado.*",
    veganSubs:
      "• ~~Chorizo~~ → **200g de setas shiitake ahumadas** o **100g de berenjena ahumada cortada pequeña**\n" +
      "• Añade **1 ct extra de pimentón ahumado** para sustituir el sabor del chorizo.\n" +
      "• El proceso es exactamente el mismo.\n\n" +
      "💡 *Las lentejas veganas con pimentón ahumado son un plato de 10. Añade un toque de vinagre de Jerez al final.*",
    allergens: [],
  },
  {
    title: "Gambas al Ajillo",
    area: "España",
    category: "Mariscos y tapas",
    ingredients: [
      "500g de gambas frescas o langostinos (pelados, con cola)",
      "6 dientes de ajo grandes",
      "1 guindilla seca (cayena) o 2 si te gusta picante",
      "100ml de aceite de oliva virgen extra",
      "1 cs de perejil fresco picado",
      "Sal al gusto",
      "Pan crujiente para acompañar",
    ],
    steps: [
      "Pela las gambas dejando la cola (la cola da sabor y es más vistoso). Sécalas bien con papel de cocina: la humedad hace que 'salten' en el aceite caliente.",
      "Lamina los ajos finamente. La guindilla córtala en 2-3 trozos (si no quieres mucho picante, retira las semillas).",
      "Pon el aceite en una cazuela de barro o sartén y caliéntalo a fuego medio. Añade el ajo y la guindilla. Sofríe a fuego suave hasta que el ajo esté dorado claro (2-3 min). Atención: el ajo quemado amarga todo el plato.",
      "Sube el fuego a alto. Añade las gambas de golpe en una sola capa y saltéalas 1 minuto por cada lado. Las gambas se cocinan muy rápido: en cuanto cambien de color (de gris translúcido a rosa opaco) están listas.",
      "Apaga el fuego, espolvorea el perejil picado y rectifica de sal.",
      "Sirve inmediatamente en la misma cazuela de barro (retiene el calor). Acompaña con mucho pan para mojar en el aceite: ¡lo mejor del plato!",
    ],
    glutenSubs:
      "✅ Las gambas al ajillo son **naturalmente sin gluten**.\n\n" +
      "• ~~Pan normal~~ → **pan sin gluten** para acompañar y mojar.\n\n" +
      "⚠️ *Si compras gambas congeladas, verifica que no tengan aditivos con gluten en el glazing (capa de hielo).*",
    veganSubs:
      "• ~~Gambas~~ → **champiñones portobello enteros** o **setas ostra** cortadas en trozos grandes\n" +
      "• El proceso es idéntico: mismo aceite, mismo ajo, misma guindilla.\n" +
      "• Las setas aguantan bien el fuego alto y quedan muy jugosas.\n\n" +
      "💡 *Los champiñones al ajillo son un clásico de la gastronomía española vegetariana. El sabor es igual de potente.*",
    allergens: ["🦐 Marisco/Crustáceo"],
  },
  {
    title: "Pollo al Ajillo",
    area: "España",
    category: "Carnes",
    ingredients: [
      "1 pollo troceado (o 800g de muslos y contramuslos)",
      "8 dientes de ajo con piel",
      "100ml de vino blanco seco",
      "50ml de aceite de oliva virgen extra",
      "1 hoja de laurel",
      "1 ct de romero seco",
      "1 ct de tomillo seco",
      "Sal y pimienta negra al gusto",
      "Perejil fresco para decorar",
    ],
    steps: [
      "Salpimenta generosamente los trozos de pollo por todos los lados. Esto es clave: el pollo tiene que estar bien sazonado antes de cocinarlo.",
      "Calienta el aceite en una cazuela amplia a fuego alto. Dora el pollo por todos los lados hasta que tenga una costra dorada (3-4 min por lado). No muevas el pollo mientras se dora: deja que la costra se forme sola. Saca el pollo y reserva.",
      "En el mismo aceite, añade los ajos enteros con piel aplastados con el canto del cuchillo. Sofríe a fuego medio 2 minutos hasta que empiecen a dorarse.",
      "Devuelve el pollo a la cazuela. Añade el laurel, el romero y el tomillo. Vierte el vino blanco y sube el fuego: deja que el alcohol se evapore 2 minutos (verás que el olor a vino se suaviza).",
      "Baja el fuego a medio-bajo, tapa y cocina 25-30 minutos. A mitad de cocción, da la vuelta a los trozos de pollo.",
      "El plato está listo cuando la salsa se haya reducido y el pollo esté tierno. Pincha el muslo en la parte más gruesa: si el jugo sale claro (no rosado), está perfecto.",
      "Sirve con perejil picado por encima y pan para mojar la salsa.",
    ],
    glutenSubs:
      "✅ El pollo al ajillo es **naturalmente sin gluten** en esta receta.\n\n" +
      "• Verifica que el vino blanco no tenga aditivos (la mayoría son sin gluten).\n" +
      "• ~~Pan~~ → **pan sin gluten** para acompañar.",
    veganSubs:
      "• ~~Pollo~~ → **400g de seitán** cortado en trozos + **200g de champiñones grandes**\n" +
      "• El seitán se dora igual que el pollo. Reduce el tiempo de cocción a 15 minutos.\n" +
      "• Añade **1 ct de caldo de verduras** en polvo para dar más profundidad.\n\n" +
      "💡 *El seitán al ajillo es uno de los mejores sustitutos de pollo: absorbe todos los sabores del ajo y el vino.*",
    allergens: [],
  },
  {
    title: "Paella de Verduras",
    area: "España",
    category: "Arroces",
    ingredients: [
      "400g de arroz bomba (o arroz redondo)",
      "1 pimiento rojo grande",
      "1 pimiento verde",
      "1 tomate grande maduro",
      "200g de judías verdes",
      "200g de alcachofas (frescas o en conserva)",
      "1 cebolla",
      "3 dientes de ajo",
      "1 lt de caldo de verduras caliente",
      "150ml de aceite de oliva",
      "1 ct de pimentón dulce",
      "1 sobre de azafrán (o 1 ct de colorante alimentario)",
      "Sal al gusto",
      "Limón para servir",
    ],
    steps: [
      "Pon el caldo en un cazo y mantenlo caliente a fuego mínimo. El azafrán infusiónalo en 2 cs de caldo caliente durante 10 minutos: así potencia su color y sabor.",
      "Calienta el aceite en la paella o sartén amplia a fuego medio-alto. Sofríe el pimiento rojo y verde cortados en tiras (5 min). Añade la cebolla y el ajo picados (5 min más). Incorpora las judías verdes troceadas y las alcachofas.",
      "Haz un hueco en el centro. Añade el tomate rallado y el pimentón. Sofríe el tomate 3-4 minutos hasta que se evapore toda el agua y quede casi seco.",
      "Añade el arroz y sofríelo 2 minutos con todo el sofrito hasta que los granos se pongan transparentes y empiecen a tostarse ligeramente. Esto sella el arroz.",
      "Vierte el caldo caliente (con el azafrán) de golpe. Extiende el arroz uniformemente por toda la paella. A partir de ahora: NO remuevas más.",
      "Cocina a fuego alto 8 minutos, luego baja a fuego medio 7 minutos más. La proporción es: doble de caldo que de arroz. Si ves que se queda seco antes de tiempo, añade un poco más de caldo caliente.",
      "Cuando el caldo se haya absorbido completamente, sube el fuego 1 minuto para crear el 'socarrat' (la capa crujiente del fondo). Apaga el fuego, cubre con papel de aluminio y deja reposar 5 minutos. Sirve con gajos de limón.",
    ],
    glutenSubs:
      "✅ La paella de verduras es **naturalmente sin gluten**.\n\n" +
      "• Solo verifica que el pimentón y el colorante sean de marcas sin trazas de gluten.",
    veganSubs:
      "✅ Esta receta **ya es 100% vegana** tal como está planteada.\n\n" +
      "💡 *Puedes añadir garbanzos cocidos para hacerla más proteica.*",
    allergens: [],
  },
  {
    title: "Gazpacho Andaluz",
    area: "España",
    category: "Sopas frías",
    ingredients: [
      "1 kg de tomates maduros de verano",
      "1 pepino mediano",
      "1 pimiento verde pequeño",
      "1 diente de ajo",
      "100ml de aceite de oliva virgen extra",
      "30ml de vinagre de Jerez (o vinagre de vino blanco)",
      "Sal al gusto",
      "200ml de agua fría",
      "Para guarnición: pepino, pimiento y cebolleta picados muy fino",
    ],
    steps: [
      "Lava bien los tomates y córtalos en cuartos. No hace falta pelarlos si tienes una buena batidora o Thermomix.",
      "Pela el pepino, córtalo por la mitad y retira las semillas con una cucharita (evita que el gazpacho amargue). Limpia el pimiento quitando el tallo y las semillas.",
      "Mete en la batidora: los tomates, el pepino, el pimiento, el ajo y la sal. Tritura a máxima potencia durante 3 minutos completos. No tengas prisa: un buen gazpacho necesita tiempo de trituración.",
      "Con la batidora en marcha, añade el aceite en hilo fino (como una mayonesa) para que emulsione. Luego el vinagre. Esto es lo que le da la textura cremosa.",
      "Prueba y rectifica de sal y vinagre. Si está muy espeso, añade agua fría poco a poco hasta la textura deseada.",
      "Cuela por un colador fino para eliminar pieles y pepitas. Esto da el acabado sedoso del gazpacho profesional.",
      "Refrigera mínimo 2 horas (mejor de un día para otro: los sabores se asientan mucho). Sirve muy frío con guarnición de pepino, pimiento y cebolleta picados.",
    ],
    glutenSubs:
      "✅ El gazpacho es **naturalmente sin gluten**.\n\n" +
      "• Sirve con **picatostes de pan sin gluten** tostados en lugar del pan normal.",
    veganSubs:
      "✅ El gazpacho es **100% vegano** tal como está.\n\n" +
      "💡 *Es un plato completamente plant-based, bajo en calorías y lleno de vitaminas.*",
    allergens: [],
  },
  {
    title: "Albóndigas en Salsa de Tomate",
    area: "España",
    category: "Carnes y guisos",
    ingredients: [
      "500g de carne picada mixta (cerdo y ternera al 50%)",
      "2 dientes de ajo",
      "1 huevo",
      "50g de pan rallado",
      "50ml de leche",
      "Perejil fresco picado",
      "Sal, pimienta y nuez moscada",
      "Harina para rebozar",
      "Aceite para freír",
      "Para la salsa: 400g de tomate triturado, 1 cebolla, 2 dientes de ajo, 1 ct de azúcar, sal, aceite y albahaca",
    ],
    steps: [
      "Remoja el pan rallado en la leche 5 minutos hasta que absorba el líquido. Este truco hace las albóndigas más jugosas y esponjosas.",
      "Mezcla en un bol la carne picada con el pan empapado, el huevo, el ajo picado muy fino, el perejil, sal, pimienta y nuez moscada. Amasa con las manos hasta que todo quede integrado. Tapa y deja reposar en la nevera 20 minutos.",
      "Forma bolas del tamaño de una nuez grande (unos 30g cada una). Pásalas por harina sacudiendo el exceso.",
      "Fríe las albóndigas en aceite abundante caliente, en tandas, dándoles vueltas para que se doren uniformemente por todos lados (3-4 minutos). No las muevas demasiado pronto: deja que se formen bien. Reserva en papel absorbente.",
      "Para la salsa: sofríe la cebolla y el ajo picados en aceite a fuego medio hasta que estén blandos. Añade el tomate triturado, el azúcar (para quitar la acidez), sal y albahaca. Cocina 15 minutos a fuego suave.",
      "Añade las albóndigas a la salsa y cocina todo junto 10 minutos a fuego muy suave. La salsa se integrará con los jugos de las albóndigas.",
      "Sirve con arroz blanco, pasta o simplemente con mucho pan.",
    ],
    glutenSubs:
      "• ~~Pan rallado normal~~ → **pan rallado sin gluten** (misma cantidad)\n" +
      "• ~~Harina de trigo para rebozar~~ → **harina de arroz o maicena**\n" +
      "• La leche y la carne son naturalmente sin gluten.\n\n" +
      "⚠️ *Verifica que la carne picada no tenga aditivos — algunas mezclas procesadas contienen gluten.*",
    veganSubs:
      "• ~~Carne picada~~ → **500g de champiñones triturados** + **150g de nueces picadas** + **100g de lentejas cocidas**\n" +
      "• ~~Huevo~~ → **1 cs de semillas de lino molidas** + **3 cs de agua** (mezcla y reposa 10 min)\n" +
      "• ~~Leche~~ → **leche de avena o de soja**\n" +
      "• La salsa de tomate ya es vegana.\n\n" +
      "💡 *Las albóndigas de setas y nueces son un plástico: se doran bien, tienen textura y absorben toda la salsa.*",
    allergens: ["🥚 Huevo", "🥛 Lácteos", "🌾 Gluten (pan rallado)"],
  },
  {
    title: "Huevos Rotos con Jamón y Patatas",
    area: "España",
    category: "Huevos y tapas",
    ingredients: [
      "4 huevos camperos o de corral",
      "4 patatas medianas",
      "150g de jamón serrano o ibérico en lonchas",
      "Aceite de oliva abundante para freír las patatas",
      "Sal en escamas (flor de sal)",
      "Pimienta negra recién molida",
    ],
    steps: [
      "Pela las patatas y córtalas en láminas irregulares tipo 'panadera' o en dados medianos. La irregularidad es parte del encanto del plato.",
      "Calienta aceite abundante en una sartén (las patatas deben quedar sumergidas). Cuando el aceite esté caliente (170°C aprox), añade las patatas. El truco: empieza a fuego medio para que se cocinen por dentro, luego sube a fuego alto para que se doren por fuera.",
      "Cocina las patatas 15-18 minutos removiendo de vez en cuando. Estarán listas cuando estén doradas por fuera y blandas por dentro (pincha con un tenedor). Sácalas y escúrrelas. Sala inmediatamente.",
      "En la misma sartén con muy poco aceite, salta el jamón en lonchas a fuego alto 30 segundos por cada lado solo para que coja temperatura y se ponga crujiente. Sácalo y resérvalo sobre las patatas.",
      "Limpia un poco la sartén y añade un chorrito de aceite fresco. Fríe los huevos a fuego medio-alto: echa el huevo y cuando la clara empiece a cuajar por los bordes, inclina la sartén y baña el huevo con el aceite caliente con una cuchara. Así queda la yema líquida y la clara cuajada.",
      "Coloca los huevos sobre las patatas y el jamón. En el momento de servir, 'rompe' los huevos con un tenedor mezclando un poco la yema con las patatas. Termina con sal en escamas y pimienta.",
    ],
    glutenSubs:
      "✅ Los huevos rotos son **naturalmente sin gluten** con estos ingredientes.\n\n" +
      "⚠️ *Algunos jamones curados en lonchas de supermercado pueden tener aditivos. Elige jamón curado natural.*",
    veganSubs:
      "• ~~Huevos~~ → **tofu sedoso (silken tofu)** cortado en porciones. Márcalo en la sartén con sal y cúrcuma hasta dorarlo.\n" +
      "• ~~Jamón serrano~~ → **lonchas de berenjena ahumada** o **tempeh ahumado** cortado fino\n" +
      "• Las patatas ya son veganas.\n\n" +
      "💡 *El tofu sedoso con cúrcuma recuerda visualmente a la yema. Aliña con levadura nutricional para el sabor.*",
    allergens: ["🥚 Huevo"],
  },
  {
    title: "Arroz con Leche",
    area: "España",
    category: "Postres",
    ingredients: [
      "200g de arroz redondo (tipo bomba o especial postres)",
      "1 litro de leche entera",
      "150g de azúcar",
      "1 ramita de canela",
      "Corteza de 1 limón (solo la parte amarilla, sin la blanca)",
      "Corteza de 1 naranja",
      "1 pizca de sal",
      "Canela molida para decorar",
    ],
    steps: [
      "Lava el arroz bajo el grifo con agua fría hasta que el agua salga casi transparente. Esto elimina el almidón superficial y evita que el arroz quede demasiado pegajoso.",
      "Pon la leche en una cazuela con la canela en rama, la corteza de limón, la corteza de naranja y la pizca de sal. Lleva a fuego medio hasta que empiece a humear (sin que hierva).",
      "Añade el arroz escurrido a la leche caliente. Remueve y baja el fuego al mínimo.",
      "Cocina durante 35-40 minutos removiendo constantemente con una cuchara de madera. No te separes de la cazuela: el arroz se pega con facilidad. El movimiento constante libera el almidón y crea la textura cremosa característica.",
      "A los 30 minutos añade el azúcar en 2-3 tandas, probando el dulzor después de cada una. Sigue removiendo hasta que el arroz esté completamente tierno y la mezcla tenga consistencia cremosa.",
      "Retira la canela en rama y las cortezas de cítricos. El arroz con leche se espesa al enfriar, así que si está muy denso, añade un poco de leche caliente.",
      "Sirve en recipientes individuales o en una fuente. Espolvorea canela molida generosamente. Come templado o bien frío (la nevera mínimo 2 horas).",
    ],
    glutenSubs:
      "✅ El arroz con leche es **naturalmente sin gluten**.\n\n" +
      "• Solo asegúrate de que el arroz no tenga trazas de gluten por contaminación cruzada en el envasado.",
    veganSubs:
      "• ~~Leche entera~~ → **leche de avena** (la más cremosa) o **leche de coco** (para una versión más exótica)\n" +
      "• La leche de avena da una cremosidad muy similar a la leche entera.\n" +
      "• El resto de ingredientes ya son veganos.\n\n" +
      "💡 *El arroz con leche de coco con un toque de vainilla está absolutamente delicioso.*",
    allergens: ["🥛 Lácteos"],
  },
  {
    title: "Croquetas de Jamón",
    area: "España",
    category: "Tapas y aperitivos",
    ingredients: [
      "150g de jamón serrano en tacos pequeños",
      "80g de mantequilla",
      "100g de harina",
      "700ml de leche entera caliente",
      "1 cebolla pequeña",
      "Nuez moscada, sal y pimienta blanca",
      "Para el rebozado: 2 huevos batidos, pan rallado grueso, aceite para freír",
    ],
    steps: [
      "Pica la cebolla muy finamente. En una sartén con la mantequilla a fuego suave, póchalas 8 minutos hasta que estén completamente transparentes y blandas.",
      "Añade el jamón y sofríe 1 minuto. Añade la harina de golpe y remueve con fuerza durante 2-3 minutos a fuego medio. La harina debe cocinarse para perder el sabor a crudo: verás que la masa se desprende de las paredes.",
      "Añade la leche caliente poco a poco (en 4-5 tandas), removiendo con fuerza entre cada adición. Usa unas varillas para evitar grumos. Añade nuez moscada, sal y pimienta.",
      "Cocina la bechamel a fuego medio-bajo removiendo constantemente durante 15-20 minutos hasta que sea muy espesa y se despegue de las paredes. Prueba: ya no debe saber a harina cruda.",
      "Vierte en una fuente, tapa con film a piel (el film debe tocar la masa para evitar que se forme costra) y deja enfriar 4 horas en nevera o toda la noche.",
      "Con 2 cucharas o con las manos enharinadas, forma croquetas cilíndricas. Pásalas por huevo batido y luego por pan rallado. Pásalas por huevo y pan rallado una segunda vez para mejor costra.",
      "Fríe en aceite abundante a 180°C hasta que estén doradas (2-3 min). No las pongas frías directamente: el contraste de temperatura las puede romper. Escurre en papel absorbente.",
    ],
    glutenSubs:
      "• ~~Harina de trigo~~ → **harina de arroz** (misma cantidad, mismo proceso)\n" +
      "• ~~Pan rallado normal~~ → **pan rallado sin gluten**\n" +
      "• La técnica es exactamente la misma.\n\n" +
      "⚠️ *Las croquetas sin gluten son más delicadas: fríelas a temperatura constante y sin mover demasiado.*",
    veganSubs:
      "• ~~Mantequilla~~ → **margarina vegana o aceite de oliva**\n" +
      "• ~~Leche entera~~ → **leche de avena sin azúcar** (la más neutra)\n" +
      "• ~~Jamón~~ → **100g de setas shiitake troceadas + 50g de tomates secos picados** (umami puro)\n" +
      "• ~~Huevo (rebozado)~~ → **100ml de leche vegetal** para pasar las croquetas antes del pan rallado\n\n" +
      "💡 *Las croquetas de setas y tomate seco son una de las mejores tapas veganas que existen.*",
    allergens: ["🌾 Gluten", "🥛 Lácteos", "🥚 Huevo"],
  },
  {
    title: "Salmorejo Cordobés",
    area: "España",
    category: "Sopas frías",
    ingredients: [
      "1 kg de tomates muy maduros",
      "200g de pan del día anterior (miga)",
      "1 diente de ajo pequeño",
      "100ml de aceite de oliva virgen extra",
      "30ml de vinagre de Jerez",
      "Sal al gusto",
      "Para guarnición: 2 huevos duros, 100g de jamón serrano picado",
    ],
    steps: [
      "Pela los tomates (opcional pero recomendado: hazles una cruz en la base, escáldalos 30 seg en agua hirviendo y pela). Córtalos en trozos.",
      "Remoja el pan de miga en agua fría 10 minutos. Escúrrelo y aprieta bien para quitar el exceso de agua.",
      "Tritura los tomates con el pan, el ajo y la sal a máxima potencia durante 3 minutos hasta obtener una crema totalmente lisa.",
      "Sin parar la batidora, añade el aceite en hilo fino para que emulsione. Luego el vinagre. La textura debe quedar densa y aterciopelada.",
      "Pasa por un colador fino para eliminar pieles y semillas. Refrigera mínimo 2 horas.",
      "Sirve muy frío con huevo duro picado y jamón serrano por encima. Un chorrito de aceite de oliva en crudo al final es imprescindible.",
    ],
    glutenSubs:
      "• ~~Pan normal~~ → **pan sin gluten** (tipo barra sin gluten del día anterior)\n" +
      "• El resto de ingredientes son naturalmente sin gluten.\n\n" +
      "💡 *El salmorejo sin gluten queda prácticamente igual — el pan solo actúa como espesante.*",
    veganSubs:
      "• ~~Huevo duro (guarnición)~~ → **tofu duro cortado en dados y salteado con cúrcuma y sal**\n" +
      "• ~~Jamón (guarnición)~~ → **tiras de pimiento rojo asado** o **aceitunas negras picadas**\n" +
      "• La crema base ya es 100% vegana.\n\n" +
      "✅ El salmorejo es muy fácil de adaptar y queda excelente en versión vegana.",
    allergens: ["🌾 Gluten (pan)", "🥚 Huevo (guarnición)"],
  },
];

let lastIndex = -1;

function getNextRecipe(): RecipeData {
  lastIndex = (lastIndex + 1) % RECIPES.length;
  return RECIPES[lastIndex];
}

function getRandomRecipe(): RecipeData {
  const idx = Math.floor(Math.random() * RECIPES.length);
  return RECIPES[idx];
}

export async function fetchFormattedRecipe(): Promise<FormattedRecipe | null> {
  try {
    const data = getNextRecipe();
    return {
      title: data.title,
      area: data.area,
      category: data.category,
      thumbnail: "",
      youtube: "",
      source: "Receta propia",
      ingredients: data.ingredients,
      steps: data.steps,
      glutenFreeVariant: data.glutenSubs ?? "✅ Esta receta ya es naturalmente sin gluten.",
      veganVariant: data.veganSubs ?? "✅ Esta receta ya es naturalmente vegana.",
      allergens: data.allergens,
    };
  } catch (err) {
    logger.error({ err }, "Error getting recipe");
    return null;
  }
}

export async function fetchRandomRecipeOnDemand(): Promise<FormattedRecipe | null> {
  try {
    const data = getRandomRecipe();
    return {
      title: data.title,
      area: data.area,
      category: data.category,
      thumbnail: "",
      youtube: "",
      source: "Receta propia",
      ingredients: data.ingredients,
      steps: data.steps,
      glutenFreeVariant: data.glutenSubs ?? "✅ Esta receta ya es naturalmente sin gluten.",
      veganVariant: data.veganSubs ?? "✅ Esta receta ya es naturalmente vegana.",
      allergens: data.allergens,
    };
  } catch (err) {
    logger.error({ err }, "Error getting recipe");
    return null;
  }
}

// ── Franchise recipes ─────────────────────────────────────────────────────────

interface FranchiseData {
  name: string;
  ingredients: string[];
  steps: string[];
  glutenSubs: string;
  veganSubs: string;
  allergens: string[];
}

const FRANCHISE_RECIPES: Record<string, FranchiseData> = {
  dominos: {
    name: "Domino's — Pizza Pepperoni Clásica (masa original)",
    ingredients: [
      "Para la masa: 450g de harina de fuerza, 7g de levadura seca, 1 ct de sal, 1 ct de azúcar, 2 cs de aceite de oliva, 280ml de agua tibia",
      "Para la salsa: 400g de tomate triturado, 2 dientes de ajo, 1 ct de orégano, 1 ct de azúcar, sal, pimienta",
      "200g de mozzarella rallada (o bola fresca escurrida)",
      "80g de pepperoni en rodajas finas",
      "1 cs de orégano seco para terminar",
      "Harina de maíz (polenta) para la base",
    ],
    steps: [
      "Disuelve la levadura y el azúcar en el agua tibia. Espera 5-10 min hasta que forme espuma. Si no espuma, la levadura está muerta: empieza de nuevo.",
      "Mezcla harina y sal. Añade el agua con levadura y el aceite. Amasa 10 minutos hasta obtener una masa lisa y elástica (que rebote al presionarla). Forma una bola, tapa con film y deja levar 1 hora hasta que doble tamaño.",
      "Prepara la salsa: sofríe el ajo picado en aceite, añade el tomate, el orégano, azúcar, sal y pimienta. Cocina 15 min a fuego suave. Deja enfriar.",
      "Precalienta el horno a 250°C (máxima temperatura, mínimo 30 min). Pon una bandeja metálica dentro para que se caliente también.",
      "Divide la masa en 2 partes. Estira cada una muy fina con rodillo hasta 30cm de diámetro. Espolvorea harina de maíz debajo para que no se pegue.",
      "Cubre la base con salsa (sin llegar al borde), mozzarella y las rodajas de pepperoni. Desliza sobre la bandeja caliente del horno.",
      "Hornea 10-12 minutos hasta que los bordes estén dorados y el queso burbujee. El truco Domino's: la base muy fina + horno muy caliente. Espolvorea orégano al sacar y sirve de inmediato.",
    ],
    glutenSubs:
      "• ~~Harina de fuerza~~ → **mezcla de harina sin gluten para pan** (tipo Schär Mix B) + **1 ct de psyllium husk** para elasticidad\n" +
      "• La salsa, la mozzarella y el pepperoni ya son sin gluten.\n\n" +
      "⚠️ *Domino's tiene líneas cruzadas en sus pizzerías. Esta versión casera sin gluten es completamente segura.*",
    veganSubs:
      "• ~~Mozzarella~~ → **mozzarella vegana** (Violife, Follow Your Heart)\n" +
      "• ~~Pepperoni~~ → **pepperoni vegano** (de seitán o seitan ahumado) o **champiñones + aceitunas negras**\n" +
      "• La masa ya es vegana. La salsa también.\n\n" +
      "💡 *Una pizza vegana con champiñones, pimientos y aceitunas supera con creces al pepperoni en sabor y textura.*",
    allergens: ["🌾 Gluten", "🥛 Lácteos (mozzarella)"],
  },
  pizzahut: {
    name: "Pizza Hut — Pan Pizza Deep Dish (base gruesa y crujiente)",
    ingredients: [
      "Para la masa: 500g de harina de fuerza, 7g de levadura seca, 2 ct de sal, 1 ct de azúcar, 4 cs de aceite de oliva, 300ml de agua tibia",
      "3 cs extra de aceite de oliva para la sartén (el secreto del fondo crujiente)",
      "Para la salsa: 500g de tomate triturado, ajo, orégano, albahaca, sal, 1 ct de azúcar",
      "250g de mozzarella rallada",
      "Toppings al gusto: jamón, champiñones, pimientos, cebolla, aceitunas",
      "Parmesano rallado para gratinar",
    ],
    steps: [
      "Prepara la masa como en una pizza normal: levadura + agua tibia (esperar espuma), mezclar con harina, sal y aceite. Amasar 10 min. Levar 1 hora hasta doblar.",
      "El secreto del Pan Pizza: vierte 3 cs de aceite en una sartén de hierro fundido o molde rectangular. Inclínala para que el aceite cubra bien el fondo y los bordes. Esto creará el fondo frito y crujiente.",
      "Extiende la masa con las manos en la sartén aceitada sin usar rodillo: empuja desde el centro hacia los bordes hasta rellenar todo el molde. Deja un borde grueso de 2-3 cm. Tapa y deja levar 30 minutos más.",
      "Prepara la salsa cocinando el tomate con el ajo, las hierbas y el azúcar durante 20 minutos. Debe quedar espesa.",
      "Precalienta el horno a 220°C. Cubre la masa con la salsa generosamente, la mozzarella, los toppings y el parmesano por encima.",
      "Hornea 20-25 minutos. La base debe sonar hueca al golpearla con los nudillos. Deja reposar 5 minutos en el molde antes de cortar: los jugos se redistribuyen.",
    ],
    glutenSubs:
      "• ~~Harina de fuerza~~ → **mezcla sin gluten + psyllium husk** (misma cantidad)\n" +
      "• Con masa sin gluten, la base no queda igual de esponjosa pero sí crujiente por el aceite del molde.\n\n" +
      "✅ El resto de ingredientes son sin gluten.",
    veganSubs:
      "• ~~Mozzarella y parmesano~~ → **queso vegano rallado** (Violife o Sheese)\n" +
      "• Los toppings de verduras ya son veganos. ~~Jamón~~ → **pimientos asados + champiñones**\n" +
      "• La masa ya es vegana.\n\n" +
      "💡 *El Pan Pizza vegano con muchas verduras y queso vegano fundido es uno de los mejores resultados posibles.*",
    allergens: ["🌾 Gluten", "🥛 Lácteos"],
  },
  subway: {
    name: "Subway — Sándwich Italian BMT con Pan Artesano",
    ingredients: [
      "Para el pan Subway: 500g de harina de fuerza, 7g de levadura, 1 ct de sal, 2 ct de azúcar, 2 cs de aceite, 300ml de agua tibia, semillas de sésamo para decorar",
      "6 rodajas de salami italiano",
      "6 rodajas de pepperoni",
      "6 rodajas de jamón cocido",
      "4 lonchas de queso americano o provolone",
      "Lechuga iceberg, tomate, pepinillo, cebolla, aceitunas, pimientos verdes",
      "Salsas: mayonesa, mostaza americana, vinagre de vino, aceite de oliva, orégano, sal",
    ],
    steps: [
      "Para el pan: mezcla la levadura con agua tibia y azúcar, espera 5 min. Añade harina, sal y aceite. Amasa 8 min. Levar 1 hora. El pan Subway tiene forma de baguette chato: divide en 4 porciones y forma rectángulos alargados de 25cm.",
      "Pinta los panes con agua, espolvorea sésamo y deja levar 20 minutos más. Hornea a 200°C durante 15-18 minutos. Deben quedar ligeramente dorados, blandos por dentro y con una costra muy fina.",
      "Deja enfriar los panes completamente antes de cortar. Córtalos por la mitad sin llegar hasta el fondo (bisagra). Esto es importante para que no se abra el sándwich.",
      "Montaje Subway (en orden exacto desde abajo): carnes frías (salami + pepperoni + jamón) → queso. Si quieres el sándwich caliente: hornea 30 segundos con el queso hasta que funda.",
      "Añade las verduras en este orden: lechuga → tomate → pepinillo → cebolla → aceitunas → pimientos. El orden importa para que las verduras no se empapen.",
      "Termina con las salsas: primero mayonesa, luego mostaza, un chorrito de vinagre y aceite de oliva, orégano y sal. Cierra el sándwich y sirve envuelto en papel para comer.",
    ],
    glutenSubs:
      "• ~~Pan artesano de trigo~~ → **baguette sin gluten** (Schär o Genius)\n" +
      "• Las carnes, quesos y verduras son sin gluten.\n" +
      "• Verifica que las salsas embotelladas no tengan gluten añadido.\n\n" +
      "⚠️ *Subway no garantiza ausencia de contaminación cruzada en sus locales.*",
    veganSubs:
      "• ~~Carnes frías~~ → **proteína de soja texturizada** o **tiras de tempeh marinado** + **aguacate en lonchas**\n" +
      "• ~~Queso~~ → **queso vegano** o prescinde de él\n" +
      "• ~~Mayonesa~~ → **mayonesa vegana**\n" +
      "• El pan ya es vegano.\n\n" +
      "💡 *Subway tiene opciones veggie oficiales. El Veggie Delite en versión casera con aguacate y hummus es imbatible.*",
    allergens: ["🌾 Gluten (pan)", "🥛 Lácteos (queso)", "🥚 Huevo (mayonesa)"],
  },
  fiveguys: {
    name: "Five Guys — Hamburguesa Doble con Bacon y Cajun Fries",
    ingredients: [
      "Para las hamburguesas: 600g de carne de ternera picada (80/20) — sin ligante, solo carne",
      "4 panes de brioche con sésamo",
      "4 lonchas de bacon ahumado",
      "4 lonchas de queso americano",
      "Toppings libres: lechuga, tomate, cebolla, pepinillo, jalapeños, ketchup, mayonesa, mostaza, salsa BBQ",
      "Para Cajun Fries: 4 patatas grandes con piel, aceite de girasol, 2 cs de mezcla cajun (pimentón + ajo + cebolla + pimienta cayena + tomillo + orégano)",
      "Sal gruesa",
    ],
    steps: [
      "La filosofía Five Guys: carne de calidad, sin rellenos ni huevo. Pesa 150g de carne por hamburguesa y forma una bola. No compactes demasiado — manipulación mínima = más jugosa.",
      "Cajun Fries: lava las patatas y córtalas con piel en bastones. Fríe en tandas a 160°C durante 5 min (precocción). Saca y deja enfriar. Vuelve a freír a 190°C durante 3 min (crujiente). Escurre, mezcla con la mezcla cajun y sal gruesa.",
      "Para las hamburguesas: sartén o plancha a fuego máximo. Coloca la bola de carne y aplástala al máximo con la espátula hasta que tenga 1cm de grosor. Sala generosamente. El 'smash' crea la costra de Maillard que es la firma de Five Guys.",
      "Cocina 2 minutos sin mover. Da la vuelta, coloca queso encima y cocina 1.5 minutos. Saca.",
      "Fríe el bacon en la misma sartén hasta que esté crujiente. Tuesta los panes con un poco de mantequilla.",
      "Monta con 2 hamburguesas (double) + bacon + todos los toppings que quieras. En Five Guys los toppings son GRATIS e ILIMITADOS, así que sé generoso. Sirve los Cajun Fries en papel de estraza.",
    ],
    glutenSubs:
      "• ~~Pan brioche~~ → **pan sin gluten** (tipo brioche sin gluten)\n" +
      "• La carne, bacon, queso y verduras son sin gluten.\n" +
      "• Las salsas: elige versiones sin gluten.\n\n" +
      "💡 *Five Guys ofrece 'burger en bol de lechuga' (lettuce wrap) como opción sin gluten en sus locales.*",
    veganSubs:
      "• ~~Carne~~ → **patty de judías negras y avena** (200g judías + 50g avena + especias) — las aplastas igual con el smash\n" +
      "• ~~Bacon~~ → **tiras de coco ahumado** o **tofu ahumado en tiras finas**\n" +
      "• ~~Queso~~ → **queso vegano en lonchas**\n" +
      "• Las Cajun Fries ya son veganas.\n\n" +
      "💡 *El smash vegano funciona bien con legumbres: la técnica de aplastado crea costra igual que con carne.*",
    allergens: ["🌾 Gluten (pan)", "🥛 Lácteos (queso, mantequilla)", "🥚 Huevo (mayonesa)"],
  },
  tacobell: {
    name: "Taco Bell — Crunchy Taco Supreme (receta completa)",
    ingredients: [
      "Para las tortillas crujientes: 12 tortillas de maíz o 12 taco shells ya horneados",
      "500g de carne picada de ternera",
      "Mezcla de especias taco: 1 cs de comino, 1 cs de chile en polvo, 1 ct de ajo en polvo, 1 ct de cebolla en polvo, 1 ct de orégano, 1 ct de pimentón, sal y pimienta",
      "150ml de agua",
      "Lechuga romana picada fina",
      "2 tomates en dados pequeños",
      "150g de queso cheddar rallado fino",
      "4 cs de crema agria (sour cream)",
      "Salsa picante al gusto (Valentina o Tabasco)",
    ],
    steps: [
      "Para las taco shells caseras: calienta el horno a 200°C. Pincela las tortillas de maíz con aceite por los dos lados. Dobla cada una sobre las rejillas del horno (cuelga la tortilla sobre dos barras). Hornea 8-10 minutos hasta que estén rígidas y crujientes. Esto es exactamente como las hacen en Taco Bell.",
      "Dora la carne picada en sartén a fuego alto sin aceite (la propia grasa es suficiente). Rompe los grumos con una cuchara. Cuando esté dorada, escurre el exceso de grasa.",
      "Añade la mezcla de especias y el agua a la carne. Remueve a fuego medio hasta que el agua se absorba y las especias queden integradas (3-4 min). El agua es clave: hace que las especias se peguen bien a la carne.",
      "Prepara todos los toppings: lechuga bien fría y crujiente, tomate en dados, queso rallado y crema agria.",
      "Montaje: carne en la base de la shell → queso (el calor lo funde ligeramente) → lechuga → tomate → crema agria → salsa picante.",
      "Sirve de inmediato: el crunch de la shell se pierde si esperas. En Taco Bell se sirve en 30 segundos por eso.",
    ],
    glutenSubs:
      "✅ Los Crunchy Tacos son **naturalmente sin gluten** si usas tortillas de maíz puro.\n\n" +
      "• ~~Tortillas de trigo~~ (si usas soft tacos) → **tortillas de maíz certificadas sin gluten**\n" +
      "• Verifica que la mezcla de especias no tenga aditivos con gluten.",
    veganSubs:
      "• ~~Carne picada~~ → **300g de nueces trituradas gruesas** + especias taco (textura asombrosa) o **proteína de soja texturizada**\n" +
      "• ~~Queso cheddar~~ → **queso vegano rallado** o **levadura nutricional** con sal\n" +
      "• ~~Crema agria~~ → **crema de anacardos**: 100g anacardos remojados + 2 cs de limón + 50ml agua, triturar\n" +
      "• La lechuga, tomate y salsa ya son veganos.\n\n" +
      "💡 *Los tacos de nueces especiadas son la versión vegana que se hace viral en redes. La textura es idéntica.*",
    allergens: ["🥛 Lácteos (queso, crema agria)", "🌽 Maíz"],
  },
  popeyes: {
    name: "Popeyes — Sándwich de Pollo Picante (el viral del 2019)",
    ingredients: [
      "2 pechugas de pollo fileteadas en mariposa (o 4 filetes finos)",
      "300ml de suero de leche (buttermilk) o leche con 1 cs de vinagre",
      "1 cs de salsa picante tipo Tabasco o Frank's (para la marinada)",
      "Para el rebozado: 200g de harina, 1 ct de cada: sal, pimienta, ajo en polvo, cebolla en polvo, pimentón, cayena, orégano",
      "Aceite de girasol para freír",
      "4 panecillos brioche con sésamo",
      "Mayonesa picante: 4 cs mayonesa + 2 ct de salsa picante + 1 ct de miel",
      "8 rodajas de pepinillo encurtido (obligatorio — es el 30% del sabor)",
    ],
    steps: [
      "Marina las pechugas en el suero de leche con la salsa picante. Mínimo 4 horas en nevera, mejor toda la noche. La acidez del suero ablanda la carne y la hace increíblemente tierna.",
      "Mezcla todos los ingredientes del rebozado en un bol. Saca el pollo del suero (escurre pero no seques), pásalo por la harina presionando fuerte para que se forme una capa gruesa y rugosa. Esa rugosidad es la firma del Popeyes.",
      "Deja reposar el pollo rebozado en rejilla 10 minutos. El reposo asienta el rebozado.",
      "Fríe a 175°C durante 6-7 minutos por lado hasta que el exterior esté dorado oscuro (más oscuro que el KFC — ese es el estilo Popeyes). La temperatura interior debe llegar a 75°C.",
      "Prepara la mayonesa picante mezclando todos sus ingredientes. Ajusta el picante al gusto.",
      "Tuesta el brioche. Monta: mayonesa picante en ambas mitades → pollo frito → 4 rodajas de pepinillo. Cierra y sirve. El pepinillo no es opcional: su acidez equilibra el frito y la grasa. Es el secreto del sándwich.",
    ],
    glutenSubs:
      "• ~~Harina de trigo~~ → **mezcla 50/50 de harina de arroz y almidón de patata** (créate la costra rugosa)\n" +
      "• ~~Panecillo brioche~~ → **brioche sin gluten**\n\n" +
      "⚠️ *El pollo de Popeyes original está rebozado con gluten. Esta versión casera te da control total.*",
    veganSubs:
      "• ~~Pechuga de pollo~~ → **seitán en filetes** o **'pollo' de coliflor**: cabeza de coliflor cortada en 'steaks' de 2cm\n" +
      "• ~~Suero de leche~~ → **leche de soja + vinagre de manzana**\n" +
      "• ~~Mayonesa~~ → **mayonesa vegana + salsa picante**\n\n" +
      "💡 *El sándwich de coliflor de Popeyes se ha convertido en su propio fenómeno viral vegano.*",
    allergens: ["🌾 Gluten (rebozado y pan)", "🥛 Lácteos (suero)", "🥚 Huevo (mayonesa)"],
  },
  chickfila: {
    name: "Chick-fil-A — Original Chicken Sandwich (el clásico americano)",
    ingredients: [
      "4 filetes de pechuga de pollo (aprox. 150g cada uno)",
      "200ml de zumo de encurtidos/pepinillo (pickle juice) — el secreto de Chick-fil-A",
      "200ml de leche entera",
      "1 huevo batido",
      "200g de harina",
      "1 cs de azúcar en polvo (sí, azúcar — da el toque dulce característico)",
      "Sal, pimienta, paprika, ajo en polvo",
      "4 panes de hamburguesa simples (sin sésamo, estilo americano suave)",
      "Mantequilla derretida para los panes",
      "8-10 rodajas de pepinillo encurtido (obligatorias)",
    ],
    steps: [
      "Marina el pollo en el zumo de pepinillo durante 30 minutos mínimo (hasta 4h en nevera). Este es el secreto absoluto de Chick-fil-A: el pickle juice da el sabor ligeramente ácido característico que nadie sabe identificar.",
      "Mezcla la leche con el huevo batido. Mezcla la harina con el azúcar, sal, pimienta, paprika y ajo en polvo.",
      "Saca el pollo del pickle juice, sumérge en la mezcla de leche-huevo y luego pásalo por la harina presionando bien. Una sola capa de rebozado: Chick-fil-A no hace doble rebozado.",
      "Fríe en aceite de cacahuete (el original usa aceite de cacahuete refinado) a 175°C durante 4 minutos por lado. El aceite de cacahuete tiene un punto de humo alto que da un sabor neutro y limpio.",
      "Los panes: úntalos generosamente con mantequilla por dentro y tóstalos en sartén hasta que estén dorados. Este paso es diferente al McD o BK y da el sabor 'mantequilloso' distintivo.",
      "Monta (minimalista — sin lechuga ni tomate en el original): pan → 2-3 rodajas de pepinillo → pollo. Eso es todo. La simplicidad es el secreto.",
    ],
    glutenSubs:
      "• ~~Harina de trigo~~ → **harina de arroz** (misma cantidad, misma técnica)\n" +
      "• ~~Pan~~ → **pan sin gluten suave y esponjoso**\n" +
      "• El pickle juice, el pollo y la mantequilla son sin gluten.\n\n" +
      "💡 *Chick-fil-A es famoso por ser un sándwich simple y limpio — fácil de adaptar sin gluten.*",
    veganSubs:
      "• ~~Pollo~~ → **seitán en filetes** marinado también en pickle juice\n" +
      "• ~~Leche y huevo (rebozado)~~ → **200ml de leche de avena** sola (sin huevo)\n" +
      "• ~~Mantequilla~~ → **margarina vegana**\n\n" +
      "💡 *El seitán marinado en pickle juice y frito con azúcar en la harina es indistinguible del original.*",
    allergens: ["🌾 Gluten", "🥚 Huevo", "🥛 Lácteos (mantequilla)", "🥜 Frutos secos (aceite de cacahuete)"],
  },
  wendys: {
    name: "Wendy's — Baconator (la hamburguesa icónica con bacon doble)",
    ingredients: [
      "600g de carne de ternera fresca picada (nunca congelada — lema de Wendy's)",
      "6 lonchas de bacon ahumado americano grosor medio",
      "4 lonchas de queso americano",
      "4 panes de hamburguesa cuadrados (Wendy's usa pan cuadrado) o redondos",
      "Ketchup y mayonesa",
      "Sal y pimienta negra",
    ],
    steps: [
      "El Baconator lleva 2 hamburguesas (patties) de 150g cada una. Forma bolas y aplánalas a mano en cuadrado (para imitar el estilo Wendy's). Sala solo por fuera justo antes de cocinar.",
      "Fríe el bacon en sartén hasta que esté muy crujiente. Reserva. No tires la grasa del bacon: añade ahí las hamburguesas.",
      "Cocina las hamburguesas en la grasa del bacon a fuego alto, 2 minutos por lado. Da la vuelta, coloca una loncha de queso americano y tapa 30 segundos para que se funda.",
      "Tuesta los panes en la misma sartén con la grasa residual.",
      "Montaje Baconator (más grasa, más sabor): pan base → ketchup → mayonesa → hamburguesa+queso → 3 lonchas de bacon → hamburguesa+queso → 3 lonchas de bacon → pan superior.",
      "No lleva verduras en el Baconator original: es literalmente carne, bacon y queso. Si quieres la versión 'Son of Baconator' (más pequeña), usa patties de 100g.",
    ],
    glutenSubs:
      "• ~~Pan cuadrado~~ → **pan sin gluten** (cuadrado si encuentras, redondo si no)\n" +
      "• La carne, el bacon, el queso y las salsas son sin gluten (verifica etiquetas).\n\n" +
      "⚠️ *El Baconator es uno de los platos más fáciles de adaptar sin gluten.*",
    veganSubs:
      "• ~~Carne~~ → **patty doble de proteína de soja** o **2 x Beyond Burger**\n" +
      "• ~~Bacon~~ → **tiras de tempeh marinado en salsa de soja + humo líquido + sirope de arce**, freír crujiente\n" +
      "• ~~Queso~~ → **queso vegano en lonchas**\n" +
      "• ~~Mayonesa~~ → **mayonesa vegana**\n\n" +
      "💡 *El tempeh bacon es quizás el mejor sustituto del bacon en todo el mundo vegano. Crujiente, ahumado y salado.*",
    allergens: ["🌾 Gluten (pan)", "🥛 Lácteos (queso)", "🥚 Huevo (mayonesa)"],
  },
  cinnabon: {
    name: "Cinnabon — Rollos de Canela Clásicos con Cream Cheese Frosting",
    ingredients: [
      "Para la masa: 500g de harina, 7g de levadura seca, 250ml de leche tibia, 75g de azúcar, 75g de mantequilla blanda, 2 huevos, 1 ct de sal",
      "Para el relleno: 100g de mantequilla blanda, 200g de azúcar moreno, 3 cs colmadas de canela molida (más que en cualquier otra receta — el secreto Cinnabon)",
      "Para el frosting: 200g de queso Philadelphia, 100g de mantequilla blanda, 250g de azúcar glass, 2 ct de extracto de vainilla, pizca de sal",
      "Mantequilla extra para el molde",
    ],
    steps: [
      "Activa la levadura: mezcla con la leche tibia y 1 ct de azúcar. Espera 10 min. Añade la harina, azúcar, mantequilla blanda, huevos y sal. Amasa 10-12 minutos hasta que la masa sea suave, elástica y ligeramente pegajosa. Levar tapado 1 hora hasta doblar.",
      "Extiende la masa con rodillo en un rectángulo de 40x30 cm. Unta toda la superficie con la mantequilla blanda. Mezcla el azúcar moreno con la canela y esparce uniformemente sobre la mantequilla. Presiona ligeramente para que se adhiera.",
      "Enrolla la masa por el lado largo (40cm) de forma apretada. Corta en 12 rollos de 3-4 cm con hilo dental o cuchillo afilado (el hilo dental da un corte limpio sin aplastar).",
      "Coloca los rollos en molde engrasado dejando espacio entre ellos. Tapa y deja levar 30-45 minutos más hasta que estén esponjosos y se toquen entre sí.",
      "Hornea a 180°C durante 20-25 minutos. Deben quedar dorados pero no secos. El interior debe estar suave y tierno.",
      "Mientras horneas, bate el queso Philadelphia con la mantequilla, el azúcar glass y la vainilla hasta obtener una crema sedosa. Cubre los rollos calientes nada más salir del horno para que el frosting se derrita parcialmente y penetre en cada vuelta.",
    ],
    glutenSubs:
      "• ~~Harina de trigo~~ → **mezcla de harina sin gluten para repostería** + **1 ct de psyllium husk**\n" +
      "• La masa sin gluten es más frágil al enrollar: trabaja con el rectángulo en papel vegetal para ayudarte.\n\n" +
      "⚠️ *Los Cinnabon originales contienen gluten. Esta versión casera sin gluten puede quedar muy aproximada.*",
    veganSubs:
      "• ~~Mantequilla (masa y relleno)~~ → **margarina vegana** (Naturli o similar)\n" +
      "• ~~Leche~~ → **leche de avena o de almendras**\n" +
      "• ~~Huevos~~ → **2 cs de semillas de lino molidas + 6 cs de agua** (reposa 10 min)\n" +
      "• ~~Frosting: queso Philadelphia~~ → **queso vegano para untar** (Violife o Nush)\n\n" +
      "💡 *Los rollos de canela veganos son sorprendentemente idénticos al original. La canela lo es todo.*",
    allergens: ["🌾 Gluten", "🥛 Lácteos", "🥚 Huevo"],
  },
  starbucks: {
    name: "Starbucks — Frappuccino de Caramelo (receta casera exacta)",
    ingredients: [
      "2 shots de espresso bien cargado (o 60ml de café muy fuerte)",
      "200ml de leche entera bien fría",
      "3-4 cs colmadas de sirope de caramelo (tipo Monin o casero)",
      "200g de hielo picado",
      "Para el sirope de caramelo casero: 200g azúcar, 100ml agua, 100ml nata, 1 pizca de sal, 50g mantequilla",
      "Para decorar: nata montada, sirope de caramelo extra, caramelo de cobertura crujiente (toffee)",
    ],
    steps: [
      "Sirope de caramelo casero (hazlo con antelación): pon el azúcar con el agua en un cazo a fuego medio SIN remover. Cuando tome color ámbar (5-8 min), retira del fuego y añade la nata CALIENTE con cuidado (burbujea mucho). Añade mantequilla y sal. Remueve hasta integrar. Enfría.",
      "Prepara el espresso doble. Deja templar 5 minutos pero no lo enfrías del todo: así extrae mejor los aceites.",
      "En la batidora de vaso: hielo picado + leche fría + espresso + sirope de caramelo (3 cs generosas).",
      "Tritura a máxima potencia 30-45 segundos hasta que la mezcla sea completamente suave y sin trozos de hielo. El Frappuccino de Starbucks tiene esa textura de granizado fino, no de smoothie.",
      "Vierte en un vaso alto. La clave de la presentación Starbucks: la crema debe quedar en capas visibles.",
      "Decora con nata montada generosa (espira alta), un chorrito de sirope de caramelo en espiral y si tienes, trocitos de toffee o caramelo crujiente. Sirve inmediatamente con pajita gruesa.",
    ],
    glutenSubs:
      "✅ El Frappuccino de caramelo es **naturalmente sin gluten** con estos ingredientes.\n\n" +
      "• Verifica que el sirope de caramelo comprado no tenga aditivos con gluten (los artesanales Monin son sin gluten).",
    veganSubs:
      "• ~~Leche entera~~ → **leche de avena** (la que usa Starbucks en sus versiones 'oat milk')\n" +
      "• ~~Nata montada~~ → **nata de coco** batida muy fría (saca el bote de la nevera y bate solo la parte sólida)\n" +
      "• ~~Mantequilla (sirope)~~ → **margarina vegana o aceite de coco**\n\n" +
      "💡 *Starbucks Spain ya ofrece versiones plant-based. La leche de avena da una cremosidad superior a la leche de vaca en el Frappuccino.*",
    allergens: ["🥛 Lácteos", "☕ Cafeína"],
  },
  chipotle: {
    name: "Chipotle — Burrito Bowl completo (arroz, frijoles y proteína)",
    ingredients: [
      "Para el arroz de cilantro-lima (firma de Chipotle): 300g de arroz de grano largo, 400ml de agua, 1 cs de aceite, 1 ct de sal, zumo de 1 lima, ralladura de 1 lima, puñado de cilantro fresco picado",
      "Para los frijoles: 400g de frijoles negros en conserva, 1 ct de comino, 1 ct de orégano, ajo en polvo, sal",
      "Para el pollo asado: 2 pechugas, zumo de 1 lima, 2 ct de comino, 1 ct de chile ancho en polvo, 2 cs de aceite, sal, pimienta",
      "Guacamole: 2 aguacates, 1/2 cebolla roja, 1 jalapeño, cilantro, zumo de lima, sal",
      "Pico de gallo: 3 tomates, 1/2 cebolla, jalapeño, cilantro, lima, sal",
      "Extras: lechuga romana picada, crema agria, queso cheddar, salsa verde (tomatillo)",
    ],
    steps: [
      "Arroz de cilantro-lima: lava el arroz hasta que el agua salga clara. Calienta el aceite, sofríe el arroz 1 minuto. Añade el agua y la sal. Tapa y cocina a fuego mínimo 18 min. Apaga, deja reposar 5 min tapado. Mezcla con zumo de lima, ralladura y cilantro picado.",
      "Frijoles: calienta los frijoles con su líquido, el comino, orégano y ajo en polvo. Cocina 5 min a fuego suave. Aplasta unos pocos con el dorso de la cuchara para espesar el líquido.",
      "Pollo: marina 30 min con zumo de lima, comino, chile ancho, aceite, sal y pimienta. Cocina en sartén a fuego alto 4 min por lado. Deja reposar 5 min antes de cortar en tiras.",
      "Guacamole: aplasta los aguacates con tenedor (textura gruesa, no puré). Mezcla con la cebolla roja picada fina, jalapeño sin semillas picado, cilantro, zumo de lima y sal. Prueba y ajusta.",
      "Pico de gallo: mezcla los tomates en dados pequeños, cebolla, jalapeño, cilantro y zumo de lima. Sala al gusto.",
      "Monta el bowl en este orden (el orden de Chipotle): arroz → frijoles → pollo → lechuga → guacamole → pico de gallo → crema agria → queso → salsa verde. ¡Sirve inmediatamente para que el arroz caliente no marchite la lechuga!",
    ],
    glutenSubs:
      "✅ El Burrito Bowl de Chipotle es **naturalmente sin gluten** (es la razón por la que Chipotle usa bowls y no burritos como opción para celíacos).\n\n" +
      "• Todos los ingredientes: arroz, frijoles, pollo, aguacate, verduras → sin gluten.\n" +
      "• ⚠️ Solo los burritos (tortilla de trigo) contienen gluten.",
    veganSubs:
      "• ~~Pollo asado~~ → **tofu firme marinado** con los mismos condimentos (lima + comino + chile)\n" +
      "• ~~Crema agria~~ → **crema de anacardos** (anacardos + agua + lima + sal, batido)\n" +
      "• ~~Queso cheddar~~ → **levadura nutricional** o prescinde de él\n" +
      "• El arroz, frijoles, guacamole y pico de gallo ya son veganos.\n\n" +
      "💡 *El 'Sofritas Bowl' de Chipotle (tofu con chipotles) es su producto estrella vegano. Esta versión lo supera.*",
    allergens: ["🥛 Lácteos (crema agria, queso)"],
  },
  pandaexpress: {
    name: "Panda Express — Pollo a la Naranja (Orange Chicken) Original",
    ingredients: [
      "600g de muslo de pollo sin hueso cortado en dados de 3cm",
      "Para la marinada y rebozado: 2 huevos, 3 cs de salsa de soja, 1 ct de aceite de sésamo, 150g de almidón de maíz (maicena), 50g de harina, sal y pimienta",
      "Para la salsa naranja: zumo de 3 naranjas (150ml), ralladura de 1 naranja, 3 cs de salsa de soja, 2 cs de vinagre de arroz, 2 cs de azúcar moreno, 1 cs de ketchup, 1 ct de aceite de sésamo, 2 dientes de ajo rallados, 1 ct de jengibre rallado",
      "1 cs de almidón de maíz disuelta en 2 cs de agua (para espesar la salsa)",
      "Cebolleta y sésamo para decorar",
      "Aceite de girasol para freír",
    ],
    steps: [
      "Marina el pollo: mezcla los huevos con la salsa de soja y el aceite de sésamo. Añade el pollo y mezcla. Tapa y deja 20 minutos en nevera.",
      "Rebozado: mezcla el almidón de maíz con la harina, sal y pimienta. Escurre el pollo y pásalo por la mezcla de almidón. El almidón (en lugar de solo harina) es el secreto: da una costra más crujiente y translúcida que es la firma del Orange Chicken.",
      "Fríe el pollo en aceite abundante a 180°C en tandas de 4-5 piezas durante 4-5 minutos hasta que estén doradas y crujientes. Escurre en papel absorbente.",
      "Prepara la salsa naranja: en una sartén, saltea el ajo y el jengibre rallados 1 minuto con un poco de aceite. Añade el zumo de naranja, la ralladura, salsa de soja, vinagre, azúcar, ketchup y aceite de sésamo. Lleva a ebullición.",
      "Añade la maicena disuelta en agua y remueve hasta que la salsa espese (30 seg). Debe quedar brillante y ligeramente pegajosa.",
      "Añade el pollo frito a la salsa caliente y mezcla rápidamente para que cada pieza quede bien cubierta. Sirve inmediatamente sobre arroz blanco con cebolleta picada y sésamo.",
    ],
    glutenSubs:
      "• ~~Harina de trigo en el rebozado~~ → **50g más de almidón de maíz** (elimina la harina completamente)\n" +
      "• ~~Salsa de soja (contiene trigo)~~ → **tamari** (salsa de soja sin trigo, misma cantidad)\n\n" +
      "✅ Con estos dos cambios, el Orange Chicken queda completamente sin gluten.",
    veganSubs:
      "• ~~Pollo~~ → **seitán en dados** o **coliflor en floretes** (hornea a 200°C 20 min antes de freír para secar)\n" +
      "• ~~Huevos en la marinada~~ → **3 cs de aquafaba** + **1 cs de almidón**\n" +
      "• La salsa naranja ya es vegana.\n\n" +
      "💡 *El Orange Cauliflower (coliflor a la naranja) estilo Panda es el plato vegano asiático más compartido en Instagram.*",
    allergens: ["🌾 Gluten (harina y soja)", "🥚 Huevo", "🌾 Sésamo"],
  },
  nandos: {
    name: "Nando's — Pollo Peri-Peri Medio (receta portuguesa secreta)",
    ingredients: [
      "1 pollo entero abierto en mariposa (o 800g de muslos y contramuslos)",
      "Para el peri-peri sauce: 6-8 chiles piri-piri frescos (o cayenas), 4 dientes de ajo, 1 pimiento rojo asado, 3 cs de aceite de oliva, 2 cs de vinagre de vino blanco, zumo de 1 limón, 1 ct de sal, 1 ct de orégano, 1 ct de pimentón dulce",
      "Para la marinada adicional: 2 cs de peri-peri sauce, zumo de 1 limón, sal",
      "Para servir: ensalada de col (coleslaw), patatas fritas y arroz",
    ],
    steps: [
      "Prepara el peri-peri sauce: tritura todos los ingredientes (chiles, ajo, pimiento asado, aceite, vinagre, limón, sal, orégano y pimentón) en una batidora hasta obtener una salsa suave. Prueba: debe picar pero ser soportable (ajusta los chiles según tolerancia). Esta salsa aguanta 2 semanas en nevera.",
      "Marina el pollo con la mitad del peri-peri sauce + zumo de limón + sal. Mínimo 4 horas en nevera, mejor 12h. Introduce la salsa también bajo la piel del pollo con los dedos.",
      "Opción grill (lo más auténtico): precalienta la barbacoa o una plancha acanalada a fuego alto. Pon el pollo con el lado de la piel hacia abajo primero. Cocina 15 min, da la vuelta, cocina 20 min más. Unta con más peri-peri sauce durante la cocción.",
      "Opción horno: precalienta a 220°C. Coloca el pollo con la piel hacia arriba. Hornea 45-50 minutos, untando con peri-peri sauce cada 15 minutos. Los últimos 5 minutos sube a 240°C para que la piel quede crujiente.",
      "El pollo está listo cuando la temperatura interna llega a 75°C y los jugos salen claros. Deja reposar 10 minutos antes de cortar.",
      "Sirve con el peri-peri sauce restante como salsa de acompañamiento, coleslaw y patatas fritas. El limón fresco a un lado es imprescindible.",
    ],
    glutenSubs:
      "✅ El Pollo Peri-Peri de Nando's es **naturalmente sin gluten**.\n\n" +
      "• Todos los ingredientes del peri-peri sauce son sin gluten.\n" +
      "• Verifica las patatas fritas: las congeladas a veces llevan rebozado de trigo.",
    veganSubs:
      "• ~~Pollo~~ → **coliflor entera** (unta con peri-peri sauce y asa al horno 220°C por 40 min) o **seitán** o **tofu extra firme**\n" +
      "• El peri-peri sauce ya es vegano.\n\n" +
      "💡 *El peri-peri de coliflor es el plato vegano estrella en los Nando's del Reino Unido. Queda absolutamente delicioso.*",
    allergens: ["🌶️ Sulfitos (vinagre)", "🧄 Sin alérgenos principales"],
  },
  innout: {
    name: "In-N-Out Burger — Double Double con Animal Style (receta secreta)",
    ingredients: [
      "400g de carne de ternera picada fresca (80/20) — nunca congelada, filosofía In-N-Out",
      "4 panes de hamburguesa blancos y blandos (brioche suave)",
      "2 lonchas de queso americano",
      "Lechuga iceberg bien fría",
      "2 rodajas de tomate gruesas",
      "Para la Spread (salsa secreta): 3 cs de mayonesa, 1 cs de ketchup, 1 cs de relish dulce de pepinillo, 1/2 ct de vinagre blanco",
      "Para Animal Style: 1 cebolla picada muy fina (cocida en la plancha con mostaza hasta caramelizar), mostaza amarilla americana extra",
      "Sal gruesa y pimienta",
    ],
    steps: [
      "Prepara la In-N-Out Spread: mezcla la mayonesa, ketchup, relish y vinagre. Refrigera mínimo 15 minutos. Esta salsa es el secreto que identifica a In-N-Out al primer bocado.",
      "Animal Style: pon la cebolla picada muy fina en la plancha/sartén caliente con un poco de aceite y una cucharadita de mostaza americana. Cocina a fuego medio-bajo 20-25 minutos, removiendo, hasta que esté dorada y caramelizada. La mostaza la hace brillante.",
      "Forma 2 bolas de 100g de carne. Aplana a mano hasta 1cm. Para el Animal Style: unta la hamburguesa en la plancha con mostaza americana antes de darle la vuelta.",
      "Cocina 2 min en plancha muy caliente. Da la vuelta, pon mostaza encima, queso americano encima del queso, tapa 1 min.",
      "Tuesta los panes en la plancha.",
      "Montaje Double Double: pan base → Spread generosa → lechuga → tomate → hamburguesa+queso → hamburguesa+queso → cebolla caramelizada Animal Style → Spread extra → pan superior. Envuelve en papel y sirve.",
    ],
    glutenSubs:
      "• ~~Pan blanco suave~~ → **pan sin gluten de miga blanda**\n" +
      "• La carne, queso, lechuga, tomate y la Spread son sin gluten (verifica la mayonesa y el ketchup).\n\n" +
      "💡 *In-N-Out ofrece 'Protein Style' (en hoja de lechuga) como opción sin pan/sin gluten en sus locales.*",
    veganSubs:
      "• ~~Carne~~ → **patty de garbanzos y remolacha** (textura jugosa y color rojo)\n" +
      "• ~~Queso~~ → **queso vegano en lonchas**\n" +
      "• ~~Mayonesa en la Spread~~ → **mayonesa vegana**\n" +
      "• La cebolla caramelizada ya es vegana.\n\n" +
      "💡 *El 'Veggie Burger' de In-N-Out es de los pocos que admiten en su 'menú secreto'. La versión casera vegana lo supera.*",
    allergens: ["🌾 Gluten (pan)", "🥛 Lácteos (queso)", "🥚 Huevo (mayonesa)"],
  },
  "100montaditos": {
    name: "100 Montaditos — Montadito de Lomo y Pimiento (el clásico español)",
    ingredients: [
      "1 barra de pan 'vienesa' o pan de montadito (pequeño, oval, de miga esponjosa)",
      "150g de lomo de cerdo en filetes finos (o lomo embuchado en lonchas)",
      "4-6 tiras de pimiento rojo asado (en conserva o casero)",
      "Aceite de oliva virgen extra",
      "Sal en escamas",
      "Extras clásicos: 1 cs de alioli suave, orégano seco",
    ],
    steps: [
      "El pan de montadito es la clave: compra barras vienesas pequeñas de panadería. Si no encuentras, usa panecillos blancos ovalados de miga tierna. Córtalos por la mitad en horizontal.",
      "Para el pimiento asado casero: unta pimientos rojos enteros con aceite, hornea a 200°C 40-45 min girando a mitad. Mételos en bolsa de plástico cerrada 10 min (el vapor facilita pelarlos). Pela, quita semillas y corta en tiras.",
      "Para el lomo: si es fresco, sazona los filetes finos con sal y fríelos en sartén con aceite a fuego alto 1 min por lado (no más — el lomo se seca). Si es embuchado en lonchas, no necesita cocinarse.",
      "Tuesta el pan cortado en el tostador o en sartén con un poco de aceite hasta que esté dorado por dentro.",
      "Montaje: unta el pan con alioli suave → coloca 2-3 filetes de lomo → 2-3 tiras de pimiento rojo asado → sal en escamas → orégano → chorrito de aceite.",
      "En 100 Montaditos se sirven en bandejas de 6. El secreto es el pan tierno, el lomo jugoso y el pimiento dulce: el contraste de tres texturas y sabores en dos bocados.",
    ],
    glutenSubs:
      "• ~~Pan vienés~~ → **panecillo sin gluten pequeño** (Schär 'Pane di Casa' mini)\n" +
      "• El lomo, el pimiento, el aceite y la sal son naturalmente sin gluten.\n" +
      "• ~~Alioli de bote~~ → **alioli casero certificado sin gluten**.\n\n" +
      "✅ Muy fácil de adaptar: el montadito SG queda prácticamente idéntico.",
    veganSubs:
      "• ~~Lomo de cerdo~~ → **berenjena asada en rodajas** marinada con pimentón y ajo o **tempeh en lonchas finas** marcado en plancha\n" +
      "• ~~Alioli con huevo~~ → **alioli vegano** (leche de soja + aceite + ajo + sal, emulsionado con batidora)\n" +
      "• El pimiento asado ya es vegano.\n\n" +
      "💡 *El montadito de berenjena asada con pimiento es uno de los mejores montaditos vegetarianos de toda España.*",
    allergens: ["🌾 Gluten (pan)", "🥚 Huevo (alioli)"],
  },
  wingstop: {
    name: "Wingstop — Alitas Lemon Pepper (las más pedidas del menú)",
    ingredients: [
      "1.5 kg de alitas de pollo enteras, cortadas en drumettes y flats",
      "Para la marinada: 2 cs de sal, 1 cs de pimienta negra, 1 cs de ajo en polvo, aceite de oliva",
      "Para el rebozado seco: 3 cs de almidón de maíz + 3 cs de harina + 1 ct de levadura en polvo (el levadura da ligereza extrema)",
      "Para la Lemon Pepper sauce: ralladura de 3 limones, 1 cs de pimienta negra recién molida muy generosa, 100g de mantequilla derretida, zumo de 1 limón",
      "Aceite de girasol para freír",
    ],
    steps: [
      "Seca las alitas con papel de cocina muy bien. La humedad es el enemigo del crujiente. Mezcla con sal, pimienta, ajo en polvo y un chorrito de aceite. Marina mínimo 1 hora (mejor 4h) en nevera.",
      "El rebozado ligero: mezcla el almidón, la harina y la levadura. Pasa las alitas frías por la mezcla seca presionando bien. La levadura en polvo hace que el rebozado quede más aireado y crujiente.",
      "Primer frío: fríe las alitas a 160°C durante 8 minutos (precocción). Sácalas y deja reposar 5 minutos. Este doble frío es el secreto de las alitas de restaurante: cocinan por dentro primero.",
      "Segundo frío: sube el aceite a 200°C. Fríe las alitas de nuevo durante 3-4 minutos hasta que estén doradas y supercrujientes. El segundo frío a mayor temperatura crea la costra perfecta.",
      "Prepara la Lemon Pepper sauce en caliente: derrite la mantequilla, añade la ralladura de limón, la pimienta muy generosa y el zumo. Remueve.",
      "Mezcla las alitas con la salsa en un bol grande con movimientos envolventes. Sírvelas inmediatamente: el crujiente dura exactamente 5 minutos antes de ablandarse. En Wingstop las sirven sin demora por eso.",
    ],
    glutenSubs:
      "• ~~Harina de trigo en el rebozado~~ → **solo almidón de maíz** (doble cantidad: 6 cs) + levadura en polvo\n" +
      "• Las alitas, mantequilla, limón y pimienta son sin gluten.\n\n" +
      "💡 *Las alitas 100% de almidón de maíz quedan incluso más crujientes que con harina. Es el secreto de muchas cadenas asiáticas de alitas.*",
    veganSubs:
      "• ~~Alitas de pollo~~ → **coliflor en floretes grandes** o **setas ostra enteras**\n" +
      "• ~~Mantequilla en la salsa~~ → **margarina vegana o aceite de oliva**\n" +
      "• La coliflor o setas se rebozan y fríen exactamente igual.\n\n" +
      "💡 *Las Lemon Pepper Wings de coliflor son el aperitivo vegano que más sorprende a los carnívoros. El rebozado crujiente + lemon pepper es imbatible.*",
    allergens: ["🌾 Gluten (harina)", "🥛 Lácteos (mantequilla)"],
  },
  shakeshack: {
    name: "Shake Shack — ShackBurger con Shack Sauce (receta revelada)",
    ingredients: [
      "400g de carne de ternera picada (mezcla brisket + short rib: 60/40 si puedes conseguirla, si no 80/20 normal)",
      "4 panes de patata (potato bun) — el pan de Shake Shack es su firma",
      "4 lonchas de queso americano",
      "Lechuga de hoja de roble o Boston",
      "4 rodajas de tomate maduro gruesas",
      "Shack Sauce: 2 cs de mayonesa, 1 cs de mostaza de Dijon, 1 ct de ketchup, 1 ct de brine de pepinillo, 1/4 ct de cayena molida, 1/4 ct de ajo en polvo",
      "Mantequilla para tostar el pan",
    ],
    steps: [
      "Prepara la Shack Sauce mezclando todos los ingredientes y refrigerando 30 minutos mínimo. Es menos dulce que la Big Mac Sauce y tiene un toque Dijon que la diferencia.",
      "El pan de patata casero (si no lo encuentras): busca 'potato bun' en panaderías o sustituye por brioche. El potato bun tiene más humedad y dulzor que el brioche — esa diferencia es importante.",
      "Forma 2 bolas de 100g por hamburguesa. Para el smash: calienta la sartén de hierro al máximo 5 minutos. Pon la bola y aplástala INMEDIATAMENTE con toda tu fuerza con la espátula hasta 0.8cm de grosor.",
      "Sala generosamente. Cocina 2 minutos SIN tocar. La corteza que se forma en contacto con el hierro caliente es el corazón del sabor. Da la vuelta, pon el queso encima y 30 segundos más.",
      "Tuesta los potato buns con mantequilla hasta que estén dorados pero suaves por dentro. La Shack Sauce va en el pan superior.",
      "Montaje: pan base → lechuga → tomate → hamburguesa+queso → Shack Sauce en el pan superior. Sirve envuelto en papel. La diferencia del ShackBurger vs otros está en la costra del smash, el pan de patata y la Shack Sauce. Cada elemento cuenta.",
    ],
    glutenSubs:
      "• ~~Potato bun~~ → **pan sin gluten esponjoso** (el más parecido al potato bun sin gluten es el de Schär Hamburger)\n" +
      "• La carne, queso, verduras y la Shack Sauce son sin gluten (verifica mayonesa y mostaza).\n\n" +
      "💡 *Shake Shack en EEUU ofrece envoltorio de lechuga (no pan) como opción sin gluten.*",
    veganSubs:
      "• ~~Carne~~ → **Beyond Burger** (Shake Shack ya los usa en EEUU oficialmente)\n" +
      "• ~~Queso~~ → **queso vegano en lonchas**\n" +
      "• ~~Mayonesa en Shack Sauce~~ → **mayonesa vegana**\n" +
      "• La técnica smash funciona igual con Beyond Burger.\n\n" +
      "💡 *Shake Shack fue una de las primeras cadenas premium en adoptar oficialmente el Beyond Burger.*",
    allergens: ["🌾 Gluten (pan)", "🥛 Lácteos (queso, mantequilla)", "🥚 Huevo (mayonesa)"],
  },
  kfc: {
    name: "KFC — Pollo Crujiente Original (11 especias secretas)",
    ingredients: [
      "1 kg de muslos y contramuslos de pollo",
      "500ml de suero de leche (buttermilk)",
      "2 huevos grandes",
      "300g de harina",
      "1 cs de sal fina",
      "1 cs de pimienta negra molida",
      "1 cs de pimienta blanca molida",
      "1 cs de pimentón ahumado",
      "1 cs de ajo en polvo",
      "1 cs de cebolla en polvo",
      "1 ct de orégano seco",
      "1 ct de tomillo seco",
      "1 ct de albahaca seca",
      "1 ct de jengibre en polvo",
      "1 ct de apio en polvo",
      "Aceite de girasol para freír (suficiente para cubrir el pollo)",
    ],
    steps: [
      "Mezcla el suero de leche con los huevos en un bol grande. Sumerge todos los trozos de pollo. Tapa y deja marinar en nevera MÍNIMO 12 horas, mejor 24h. La acidez del suero ablanda las fibras y da humedad.",
      "Mezcla la harina con TODAS las especias en un bol grande. Usa varillas para que se distribuyan uniformemente. Esta es la mezcla de las '11 especias secretas'.",
      "Saca el pollo del suero de leche y sacúdelo (que quede húmedo pero sin chorrear). Pásalo por la mezcla de harina presionando fuerte para que se adhiera bien por todos los lados.",
      "Vuelve a sumergir en el suero de leche y vuelve a pasar por la harina. Este doble rebozado es el secreto del KFC para tener esa costra gruesa y crujiente.",
      "Deja reposar el pollo rebozado en una rejilla 15-20 minutos. Esto es fundamental: el rebozado se asienta y no se cae al freír.",
      "Calienta el aceite a exactamente 175°C (usa termómetro de cocina). Fríe en tandas de 3-4 piezas máximo durante 13-15 minutos dando la vuelta una vez a mitad. No bajes la temperatura.",
      "Comprueba que el interior llega a 75°C mínimo. Escurre sobre papel absorbente 3 minutos. El reposo es importante para que la costra se asiente y quede supercrujiente.",
    ],
    glutenSubs:
      "• ~~Harina de trigo~~ → **harina de arroz** + **2 cs de almidón de maíz** (mezcla 4:1 para más crujiente)\n" +
      "• El doble rebozado funciona exactamente igual con harina de arroz.\n\n" +
      "⚠️ *El KFC original NO es apto para celíacos. Esta versión casera sí lo puede ser con harina de arroz.*",
    veganSubs:
      "• ~~Pollo~~ → **seitán en trozos grandes** o **coliflor entera** (corta en 'steaks' gruesos)\n" +
      "• ~~Suero de leche~~ → **500ml de leche de soja** + **2 cs de vinagre de manzana** (mezcla y reposa 10 min)\n" +
      "• ~~Huevos~~ → **150ml de aquafaba** (líquido del bote de garbanzos)\n" +
      "• Mismo proceso: marinar, doble rebozado, freír a 175°C.\n\n" +
      "💡 *La coliflor rebozada tipo KFC arrasó en internet. El sabor de las 11 especias lo es todo.*",
    allergens: ["🌾 Gluten", "🥚 Huevo", "🥛 Lácteos (suero)"],
  },
  bigmac: {
    name: "McDonald's — Big Mac (receta recreada)",
    ingredients: [
      "Para las hamburguesas: 400g de carne de ternera picada (20% grasa)",
      "Sal y pimienta",
      "3 panes de hamburguesa con sésamo (necesitas 1 pan extra para la capa del medio)",
      "2 lonchas de queso americano tipo cheddar",
      "2 hojas de lechuga iceberg bien fresca",
      "4-6 rodajas de pepinillo encurtido",
      "1 cs de cebolla blanca picada muy fina",
      "Big Mac Sauce: 60g de mayonesa, 1 cs de mostaza americana amarilla, 1 cs de relish dulce de pepinillo, 1 ct de vinagre blanco, 1 ct de ajo en polvo, 1 ct de cebolla en polvo, 1 ct de pimentón dulce",
    ],
    steps: [
      "Prepara la Big Mac Sauce: mezcla todos sus ingredientes en un bol y refrigera MÍNIMO 30 minutos. Los sabores deben integrarse. Esta salsa es el 80% del sabor de una Big Mac.",
      "Forma 4 bolas de 100g de carne (2 hamburguesas por Big Mac). Aplana cada una con la palma hasta que tenga unos 12cm de diámetro y 5mm de grosor. Sala solo por fuera justo antes de cocinar.",
      "Calienta una sartén de hierro o antiadherente a fuego muy alto. Sin aceite. Cuando humee, coloca la hamburguesa y aplástala con una espátula. Cocina 90 segundos sin moverla hasta que se forme costra marrón.",
      "Da la vuelta, coloca el queso americano encima y cocina 60 segundos más. Saca.",
      "Tuesta los 3 panes en la misma sartén con un poco de mantequilla o en el tostador.",
      "Montaje de abajo a arriba: pan base → salsa Big Mac → lechuga → cebolla → pepinillo → hamburguesa+queso → pan del medio → salsa Big Mac → lechuga → cebolla → pepinillo → hamburguesa+queso → pan superior.",
      "Envuelve en papel de aluminio 1 minuto antes de servir: el vapor ablanda ligeramente el pan, igual que en McDonald's.",
    ],
    glutenSubs:
      "• ~~Pan de hamburguesa normal~~ → **pan sin gluten** (Schär o similar)\n" +
      "• La carne, el queso, la lechuga, el pepinillo son sin gluten.\n" +
      "• La mayonesa y mostaza: elige versiones certificadas sin gluten.\n\n" +
      "⚠️ *El Big Mac original NO es apto para celíacos por contaminación cruzada en fábrica.*",
    veganSubs:
      "• ~~Carne de ternera~~ → **Beyond Burger** o **hamburguesa de legumbres casera** (200g lentejas + 50g avena + especias)\n" +
      "• ~~Queso americano~~ → **queso vegano en lonchas** (Violife o similar)\n" +
      "• ~~Mayonesa en la salsa~~ → **mayonesa vegana** (mismas cantidades)\n" +
      "• El pan de hamburguesa estándar suele ser vegano (sin leche ni huevo). Verifica la etiqueta.\n\n" +
      "💡 *La clave está en la salsa Big Mac vegana — con buena salsa, el resultado es sorprendente.*",
    allergens: ["🌾 Gluten (pan)", "🥛 Lácteos (queso)", "🥚 Huevo (mayonesa)"],
  },
  whopper: {
    name: "Burger King — Whopper (receta recreada)",
    ingredients: [
      "450g de carne de ternera picada (80/20 carne/grasa)",
      "4 panes de hamburguesa grandes con sésamo",
      "4 hojas de lechuga",
      "4 rodajas de tomate gruesas",
      "4 aros de cebolla cruda",
      "8 rodajas de pepinillo",
      "4 lonchas de queso americano (opcional)",
      "Ketchup, mayonesa y mostaza al gusto",
      "Sal, pimienta y un toque de humo líquido (el secreto del Whopper)",
    ],
    steps: [
      "El Whopper tiene un sabor ahumado característico. Mezcla la carne con 1 ct de humo líquido, sal y pimienta. Forma 4 bolas de unos 110g y aplánalas a 1.5cm de grosor.",
      "Lo ideal es hacerla a la brasa o plancha muy caliente. Si es sartén, caliéntala al máximo sin aceite. Cocina 3-4 minutos por lado sin presionar (el jugo es el sabor).",
      "El Whopper se hace a la llama abierta en BK. En casa, para ese efecto: usa un soplete de cocina para chamuscarlignamente los bordes de la hamburguesa ya cocinada.",
      "Tuesta los panes a la misma sartén con mantequilla.",
      "Monta de abajo a arriba: pan base → mayonesa + ketchup + mostaza → lechuga → tomate → cebolla → pepinillo → hamburguesa → queso (si usas) → pan superior.",
      "El orden del montaje importa: los aderezos van en el pan de abajo (no en el de arriba como en McDonald's). Así cada bocado tiene sabor equilibrado.",
    ],
    glutenSubs:
      "• ~~Pan normal~~ → **pan sin gluten grande** (tipo brioche sin gluten)\n" +
      "• La carne y las verduras son sin gluten.\n" +
      "• Usa **ketchup, mayonesa y mostaza certificados sin gluten**.\n\n" +
      "⚠️ *El Whopper original lleva trazas de gluten. Esta versión casera sin gluten es perfectamente replicable.*",
    veganSubs:
      "• ~~Carne~~ → **hamburguesa de remolacha y lentejas** (remolacha rallada + lentejas + especias) o **Impossible Burger**\n" +
      "• ~~Queso~~ → **queso vegano** o prescinde de él\n" +
      "• ~~Mayonesa~~ → **mayonesa vegana**\n" +
      "• Todas las verduras y salsas se mantienen igual.\n\n" +
      "💡 *La hamburguesa de remolacha queda visualmente idéntica al Whopper (roja por dentro) y el sabor ahumado lo da el humo líquido.*",
    allergens: ["🌾 Gluten (pan)", "🥚 Huevo (mayonesa)", "🥛 Lácteos (queso, mantequilla)"],
  },
};

const FRANCHISE_LIST = Object.values(FRANCHISE_RECIPES).map((r) => r.name);

export async function fetchFranchiseRecipe(
  name?: string,
): Promise<FormattedRecipe & { franchiseName: string }> {
  let data: FranchiseData | undefined;

  if (name) {
    const lower = name.toLowerCase();
    const match = (keywords: string[]) => keywords.some((k) => lower.includes(k));

    if (match(["kfc", "kentucky", "pollo crujiente", "colonel"]))
      data = FRANCHISE_RECIPES["kfc"];
    else if (match(["big mac", "mcdonalds", "mcdonald", "mc donalds", "mcdo"]))
      data = FRANCHISE_RECIPES["bigmac"];
    else if (match(["whopper", "burger king", "bk"]))
      data = FRANCHISE_RECIPES["whopper"];
    else if (match(["domino", "dominós", "pepperoni pizza"]))
      data = FRANCHISE_RECIPES["dominos"];
    else if (match(["pizza hut", "pan pizza", "deep dish"]))
      data = FRANCHISE_RECIPES["pizzahut"];
    else if (match(["subway", "bmt", "footlong", "sub"]))
      data = FRANCHISE_RECIPES["subway"];
    else if (match(["five guys", "cajun fries", "fiveguys"]))
      data = FRANCHISE_RECIPES["fiveguys"];
    else if (match(["taco bell", "tacobell", "crunchy taco", "taco"]))
      data = FRANCHISE_RECIPES["tacobell"];
    else if (match(["popeyes", "popeye"]))
      data = FRANCHISE_RECIPES["popeyes"];
    else if (match(["chick-fil-a", "chickfila", "chick fil a", "chick-fil"]))
      data = FRANCHISE_RECIPES["chickfila"];
    else if (match(["wendy", "baconator", "wendys"]))
      data = FRANCHISE_RECIPES["wendys"];
    else if (match(["cinnabon", "rollo canela", "cinnamon roll", "canela"]))
      data = FRANCHISE_RECIPES["cinnabon"];
    else if (match(["starbucks", "frappuccino", "frap", "caramelo café", "starbuck"]))
      data = FRANCHISE_RECIPES["starbucks"];
    else if (match(["chipotle", "burrito bowl", "peri peri bowl"]))
      data = FRANCHISE_RECIPES["chipotle"];
    else if (match(["panda express", "orange chicken", "panda", "pollo naranja"]))
      data = FRANCHISE_RECIPES["pandaexpress"];
    else if (match(["nandos", "nando", "peri-peri", "peri peri", "piri piri"]))
      data = FRANCHISE_RECIPES["nandos"];
    else if (match(["in-n-out", "in n out", "double double", "animal style", "innout"]))
      data = FRANCHISE_RECIPES["innout"];
    else if (match(["100 montaditos", "montadito", "100montaditos"]))
      data = FRANCHISE_RECIPES["100montaditos"];
    else if (match(["wingstop", "wing stop", "alitas", "lemon pepper"]))
      data = FRANCHISE_RECIPES["wingstop"];
    else if (match(["shake shack", "shakeshack", "shackburger", "shack sauce"]))
      data = FRANCHISE_RECIPES["shakeshack"];
  }

  if (!data) {
    const keys = Object.keys(FRANCHISE_RECIPES);
    data = FRANCHISE_RECIPES[keys[Math.floor(Math.random() * keys.length)]];
  }

  return {
    franchiseName: data.name,
    title: data.name,
    area: "Estados Unidos",
    category: "Franquicia",
    thumbnail: "",
    youtube: "",
    source: "copykat.com, secretrecipe.net",
    ingredients: data.ingredients,
    steps: data.steps,
    glutenFreeVariant: data.glutenSubs,
    veganVariant: data.veganSubs,
    allergens: data.allergens,
  };
}

// ── Formatters ────────────────────────────────────────────────────────────────

export function formatDailyRecipe(day: number, recipe: FormattedRecipe): string[] {
  const header =
    `🍽️ **DÍA ${day}: ${recipe.title.toUpperCase()} (desde 0)**\n` +
    `🌍 *${recipe.area} · ${recipe.category}*\n\n`;

  const ingredientsBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🧺 INGREDIENTES**\n` +
    recipe.ingredients.map((i) => `• ${i}`).join("\n") +
    "\n\n";

  const stepsBlock =
    `**📋 PREPARACIÓN PASO A PASO**\n` +
    recipe.steps.map((s, i) => `**Paso ${i + 1}:** ${s}`).join("\n\n") +
    "\n\n";

  const glutenBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🌾 VERSIÓN SIN GLUTEN (Celíacos)**\n` +
    recipe.glutenFreeVariant +
    "\n\n";

  const veganBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🌱 VERSIÓN VEGANA**\n` +
    recipe.veganVariant +
    "\n\n";

  const allergensBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**⚠️ ALÉRGENOS PRESENTES**\n` +
    (recipe.allergens.length > 0
      ? recipe.allergens.join("  ·  ")
      : "✅ Sin alérgenos principales detectados") +
    "\n\n";

  const footer =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📚 *Fuentes: Directo al Paladar · RecetasGratis · Cookpad ES · Karlos Arguiñano · Petitchef · Hogarmanía · El Comidista · LaVanguardia Cocina*`;

  const full =
    header + ingredientsBlock + stepsBlock + glutenBlock + veganBlock + allergensBlock + footer;
  return splitIntoChunks(full, 1900);
}

export function formatOnDemandRecipe(recipe: FormattedRecipe): string[] {
  const header =
    `🍴 **${recipe.title.toUpperCase()} (desde 0)**\n` +
    `🌍 *${recipe.area} · ${recipe.category}*\n\n`;

  const ingredientsBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🧺 INGREDIENTES**\n` +
    recipe.ingredients.map((i) => `• ${i}`).join("\n") +
    "\n\n";

  const stepsBlock =
    `**📋 PREPARACIÓN PASO A PASO**\n` +
    recipe.steps.map((s, i) => `**Paso ${i + 1}:** ${s}`).join("\n\n") +
    "\n\n";

  const glutenBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🌾 VERSIÓN SIN GLUTEN (Celíacos)**\n` +
    recipe.glutenFreeVariant +
    "\n\n";

  const veganBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🌱 VERSIÓN VEGANA**\n` +
    recipe.veganVariant +
    "\n\n";

  const allergensBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**⚠️ ALÉRGENOS**\n` +
    (recipe.allergens.length > 0
      ? recipe.allergens.join("  ·  ")
      : "✅ Sin alérgenos principales detectados") +
    "\n\n";

  const footer =
    `📚 *Fuentes: Directo al Paladar · RecetasGratis · Cookpad ES · Karlos Arguiñano · Petitchef · Hogarmanía · El Comidista · LaVanguardia Cocina*`;

  const full =
    header + ingredientsBlock + stepsBlock + glutenBlock + veganBlock + allergensBlock + footer;
  return splitIntoChunks(full, 1900);
}

export function formatFranchiseRecipe(
  recipe: FormattedRecipe & { franchiseName: string },
): string[] {
  const header =
    `🏆 **${recipe.franchiseName.toUpperCase()}**\n` +
    `🔍 *Receta secreta recreada · Franquicia*\n\n`;

  const ingredientsBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🧺 INGREDIENTES (recreación casera)**\n` +
    recipe.ingredients.map((i) => `• ${i}`).join("\n") +
    "\n\n";

  const stepsBlock =
    `**📋 PREPARACIÓN PASO A PASO**\n` +
    recipe.steps.map((s, i) => `**Paso ${i + 1}:** ${s}`).join("\n\n") +
    "\n\n";

  const glutenBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🌾 VERSIÓN SIN GLUTEN (Celíacos)**\n${recipe.glutenFreeVariant}\n\n`;

  const veganBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**🌱 VERSIÓN VEGANA**\n${recipe.veganVariant}\n\n`;

  const allergensBlock =
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `**⚠️ ALÉRGENOS**\n` +
    recipe.allergens.join("  ·  ") +
    "\n\n";

  const footer =
    `📚 *Investigado en: copykat.com · secretrecipe.net · Directo al Paladar · RecetasGratis · Cookpad ES · Karlos Arguiñano · Petitchef · Hogarmanía*`;

  const full =
    header + ingredientsBlock + stepsBlock + glutenBlock + veganBlock + allergensBlock + footer;
  return splitIntoChunks(full, 1900);
}

function splitIntoChunks(text: string, maxLen: number): string[] {
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let split = remaining.lastIndexOf("\n", maxLen);
    if (split <= 0) split = maxLen;
    chunks.push(remaining.slice(0, split));
    remaining = remaining.slice(split).trimStart();
  }
  return chunks;
}
