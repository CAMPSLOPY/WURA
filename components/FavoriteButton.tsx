import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { FaPlus } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { useSession } from 'next-auth/react';

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();
  
    

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
       
        try {
            let response;
            if (isFavorite) {
                response = await axios.delete('/api/favorite', { data: { movieId } });
            } else {
                response = await axios.post('/api/favorite', { movieId });
            }
            const updatedFavoritesIds = response?.data?.favoriteIds;
            mutate({
                ...currentUser,
                favoriteIds: updatedFavoritesIds
            });
            mutateFavorites();
        } catch (error) {
            console.error('Error:', error);
        }
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? FcCheckmark : FaPlus;
 

    return (
        <div onClick={toggleFavorites} className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-natural-300
        ">
            <Icon size={25} className="text-emerald-50" />
        </div>
    );
}

export default FavoriteButton;
