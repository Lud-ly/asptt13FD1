"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Loader from '../src/components/Sections/components/Loader';
import ChickenSoccerStory from '~/src/components/Sections/components/ChickenSoccerStory';

interface Match {
  ma_no: number;
  date: string;
  home_score: number | null;
  away_score: number | null;
  time: number;
  home: {
    short_name: string;
    club: {
      logo: string;
    };
  } | null;
  away: {
    short_name: string;
    club: {
      logo: string;
    };
  } | null;
}

const MatchsAVenirPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/matchs', { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch match data');
        }
        const data = await response.json();
        setMatches(data['hydra:member']);
      } catch (error) {
        // Check if the error is an AbortError
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.log('aborted');
          } else {
            console.error('Error loading matches:', error.message);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();

    return () => {
      controller.abort(); // Annule la requête si le composant est démonté
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-start min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center font-bold py-5 uppercase text-gold">U13 Féminines D1 ASPTT Montpellier</h1>
      <div className='flex flex-row justify-around items-center'>
        <p className="font-bold py-5 uppercase">Nos Matchs</p>
        <p className="font-bold py-5 uppercase">Poule A</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {matches.map((match) => (
          <Link key={match.ma_no} href={`/matchs/${match.ma_no}`}>
            <div className="border p-4 rounded-md shadow-md cursor-pointer">
              <p className="text-center mt-2">
                {new Date(match.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).replace(/^\w/, (c) => c.toUpperCase())} à <span className="text-blue-500">{match.time}</span>
              </p>

              <div className="grid grid-cols-3 gap-4 items-center mt-4">
                {/* Équipe domicile */}
                <div className="flex flex-col items-center shadow-lg rounded-lg p-3">
                  {match.home && match.home.club ? (
                    <>
                      <Image
                        src={match.home.club.logo}
                        alt={`Logo ${match.home.short_name}`}
                        width={80}
                        height={80}
                        className="w-20 h-20 mb-2"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/what.png";
                        }}
                      />
                      <span className="text-center truncate max-w-full text-sm">
                        {match.home.short_name.split(' ')[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      <Image
                        src="/images/what.png"
                        alt={`Logo placeholder`}
                        width={80}
                        height={80}
                        className="w-20 h-20 mb-2"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/what.png";
                        }}
                      />
                      <span className="text-sm text-gray-500">Équipe non disponible</span>
                    </>
                  )}
                </div>

                {/* Score */}
                <div className="text-2xl font-bold text-center shadow-lg rounded-lg p-3">
                  {match.home_score ?? ''} - {match.away_score ?? ''}
                </div>

                {/* Équipe extérieur */}
                <div className="flex flex-col items-center shadow-lg rounded-lg p-3">
                  {match.away && match.away.club ? (
                    <>
                      <Image
                        src={match.away.club.logo}
                        alt={`Logo ${match.away.short_name}`}
                        width={80}
                        height={80}
                        className="w-20 h-20 mb-2"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/what.png";
                        }}
                      />
                      <span className="text-center truncate max-w-full text-sm">
                        {match.away.short_name.split(' ')[0]}
                      </span>
                    </>
                  ) : (
                    <>
                      <Image
                        src="/images/what.png"
                        alt={`Logo placeholder`}
                        width={80}
                        height={80}
                        className="w-20 h-20 mb-2"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/what.png";
                        }}
                      />
                      <span className="text-sm text-gray-500">Équipe non disponible</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ChickenSoccerStory />
    </div>
  );
};

export default MatchsAVenirPage;
