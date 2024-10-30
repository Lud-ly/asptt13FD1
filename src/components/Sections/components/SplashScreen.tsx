import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import anime from "animejs";
import { useRouter } from "next/navigation";

const SplashScreen = ({ finishLoading }: { finishLoading: () => void }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [currentScreen, setCurrentScreen] = useState(0);
    const [bgColor, setBgColor] = useState("white");
    const [hasShownSplash, setHasShownSplash] = useState(false);
    const router = useRouter();

    // Wrap the animate function in useCallback to avoid dependency issues
    const animate = useCallback(() => {
        const loader = anime.timeline({
            complete: () => {
                finishLoading();
                setHasShownSplash(true);
            },
        });

        loader
            .add({
                targets: "#gif",
                opacity: [0, 1],
                duration: 1000,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#gif",
                opacity: [1, 0],
                duration: 1000,
                easing: "easeInOutExpo",
                complete: () => {
                    setCurrentScreen(1);
                },
            })
            .add({
                targets: "#logo1",
                scale: [0, 1],
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo1",
                delay: 100,
                scale: 1.25,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo1",
                delay: 100,
                scale: 1,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo1",
                opacity: 0,
                duration: 500,
                easing: "easeInOutExpo",
                complete: () => {
                    setCurrentScreen(2);
                },
            })
            .add({
                targets: "#logo2",
                scale: [0, 1],
                duration: 500,
                easing: "easeInOutExpo",
                begin: () => {
                    setBgColor("#fff");
                },
                complete: () => setBgColor("#fff"),
            })
            .add({
                targets: "#logo2",
                delay: 100,
                scale: 1.25,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo2",
                delay: 100,
                scale: 1,
                duration: 500,
                easing: "easeInOutExpo",
            });
    }, [finishLoading]);

    useEffect(() => {
        if (hasShownSplash) {
            return;
        }

        const timeout = setTimeout(() => setIsMounted(true), 10);
        animate();

        const redirectTimeout = setTimeout(() => {
            setHasShownSplash(true);
            router.push("/");
        }, 6000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(redirectTimeout);
        };
    }, [hasShownSplash, router, animate]);

    return (
        <div className="flex h-screen items-center justify-center" style={{ backgroundColor: bgColor }}>
            {isMounted && (
                <>
                    {currentScreen === 0 && (
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-2xl text-center font-bold py-2 uppercase">
                                Les Rôtis du F⚽⚽t
                            </h2>
                            <iframe
                                id="gif"
                                src="https://giphy.com/embed/elatsjsGzdLtNov4Ky"
                                width="240"
                                height="203"
                                className="giphy-embed"
                                allowFullScreen
                            />
                        </div>
                    )}
                    {currentScreen === 1 && (
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-2xl text-center font-bold py-2 uppercase">
                                U13F D1 District de l&#39;hérault
                            </h2>
                            <Image
                                id="logo1"
                                src="https://herault.fff.fr/wp-content/uploads/sites/77/2024/09/5303_Herault.png"
                                alt="Logo 1"
                                width={130}
                                height={130}
                            />
                        </div>
                    )}
                    {currentScreen === 2 && (
                        <Image
                            id="logo2"
                            src="/images/logo.jpg"
                            alt="Logo 2"
                            width={150}
                            height={150}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default SplashScreen;
