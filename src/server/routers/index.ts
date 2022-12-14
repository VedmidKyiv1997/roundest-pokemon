import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { PokemonClient } from 'pokenode-ts';

export const appRouter = router({
    getPokemonById: publicProcedure
        .input(
            z.object({
                id: z.number()
            })
        )
        .query(async ({ input }) => {
            const api = new PokemonClient();

            const pokemon = await api.getPokemonById(input.id);

            return {
                name: pokemon.name,
                imageUrl: pokemon.sprites.other?.dream_world.front_default
            };
        })
});

// export type definition of API
export type AppRouter = typeof appRouter;
