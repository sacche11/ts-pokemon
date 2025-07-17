# 🎮 ¿Quién es ese Pokémon? - Juego con React y TypeScript

Este proyecto es un sencillo pero completo juego de "Adivina el Pokémon", diseñado para ser un recurso educativo para estudiantes que están aprendiendo a construir aplicaciones con **React** y **TypeScript**.

A través de este proyecto, podrás explorar conceptos fundamentales y buenas prácticas en el desarrollo de aplicaciones web modernas.

![Demo del Juego](https://i.imgur.com/example.gif) <!-- Reemplaza esto con una URL a un GIF o screenshot de tu juego -->

## ✨ Features

- **Juego Interactivo:** Adivina el nombre del Pokémon a partir de su imagen.
- **Feedback Instantáneo:** Recibe una notificación visual si tu respuesta es correcta o incorrecta.
- **Nuevos Desafíos:** Carga un nuevo Pokémon aleatorio con un solo clic.
- **Diseño Responsivo:** Juega cómodamente en cualquier dispositivo gracias a Bootstrap.

## 🚀 Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/ts-pokemon.git
    cd ts-pokemon
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    ¡Y listo! Abre [http://localhost:5173](http://localhost:5173) en tu navegador para empezar a jugar.

## 🎓 Conceptos Clave para Estudiantes

Este proyecto es una excelente oportunidad para aprender y aplicar los siguientes conceptos:

### 1. React Hooks

Los hooks son el corazón de la lógica de nuestra aplicación.

- **`useState`:** Lo usamos para manejar el estado local, como el Pokémon actual, el estado de carga y los errores.
- **`useEffect`:** Se utiliza para cargar el primer Pokémon tan pronto como la aplicación se monta.
- **`useCallback`:** Memoriza funciones para evitar que se re-creen en cada render, optimizando el rendimiento.

#### Custom Hook: `useGameManager`

Para mantener nuestro componente `App.tsx` limpio y organizado, hemos encapsulado toda la lógica del juego en un **custom hook**: `useGameManager`.

```typescript
// src/hooks/use-game-manager.ts
export const useGameManager = () => {
   const [pokemon, setPokemon] = useState<Pokemon | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [gameState, setGameState] = useState<GameState>(GameState.Playing);

   const handlePokemonNameSubmit = useCallback((userInput: string) => {
      // ... lógica para validar
   }, [pokemon]);

   const loadNewPokemon = useCallback(async () => {
      // ... lógica para cargar un nuevo pokémon
   }, []);

   useEffect(() => {
      loadNewPokemon();
   }, [loadNewPokemon]);

   return {
      pokemon,
      isLoading,
      gameState,
      loadNewPokemon,
      handlePokemonNameSubmit,
   };
}
```

### 2. TypeScript: Tipado Estático

TypeScript nos ayuda a escribir un código más seguro y predecible.

- **Interfaces (`interface`):** Definimos la "forma" que deben tener nuestros objetos Pokémon.

  ```typescript
  // src/types/pokemon.interface.ts
  export interface Pokemon {
    id: number;
    name: string;
    image: string;
  }
  ```

- **Tipos (`type`):** Creamos tipos personalizados para representar los diferentes estados del juego, lo que evita errores y mejora la legibilidad.

  ```typescript
  // src/hooks/use-game-manager.ts
  export const GameState = {
     Playing: "playing",
     Correct: "correct",
     Wrong: "wrong",
  } as const;
  export type GameState = (typeof GameState)[keyof typeof GameState];
  ```

### 3. Arquitectura de Componentes

La interfaz de usuario está dividida en componentes pequeños y reutilizables, cada uno con una única responsabilidad.

- `PokemonDisplay`: Muestra la imagen del Pokémon.
- `PokemonForm`: Contiene el campo de entrada y el botón para enviar la respuesta.
- `PokemonResult`: Muestra si la respuesta fue correcta o no y permite cargar un nuevo Pokémon.

### 4. Servicios y Consumo de API

La lógica para comunicarnos con la [PokéAPI](https://pokeapi.co/) está aislada en un **servicio**. Esto separa las responsabilidades y hace que nuestro código sea más fácil de mantener y probar.

```typescript
// src/services/pokemon.service.ts
const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getRandomPokemon = async (): Promise<Pokemon> => {
   const randomId = getRandomNumber(1, 151);
   const response = await fetch(`${POKEMON_API_URL}/${randomId}`);
   // ...
   return { id, name, image };
}
```

### 5. Renderizado Condicional

La interfaz de usuario cambia según el estado del juego (`gameState`). Por ejemplo, el formulario se deshabilita después de una respuesta, y se muestra un mensaje de "Correcto" o "Incorrecto".

```tsx
// src/App.tsx
<PokemonForm
  handlePokemonNameSubmit={handlePokemonNameSubmit}
  gameState={gameState} // El formulario se adapta según este estado
/>
<PokemonResult
  loadNewPokemon={loadNewPokemon}
  gameState={gameState} // El resultado se muestra solo cuando es necesario
/>
```

## 📁 Estructura de Archivos

El proyecto está organizado de la siguiente manera para facilitar la navegación:

```
/src
├── assets/         # Imágenes y otros recursos estáticos
├── components/     # Componentes de React reutilizables
├── hooks/          # Custom hooks de React
├── services/       # Lógica para interactuar con APIs externas
├── types/          # Definiciones de tipos e interfaces de TypeScript
└── utils/          # Funciones de utilidad generales
```

## 📜 Scripts Disponibles

- `npm run dev`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta el linter para revisar la calidad del código.
- `npm run preview`: Sirve la build de producción localmente.

---

¡Esperamos que este proyecto te sea de gran ayuda en tu viaje de aprendizaje con React y TypeScript!