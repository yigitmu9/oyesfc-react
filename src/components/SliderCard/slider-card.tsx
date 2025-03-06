import React, { useEffect, useRef, useState } from 'react';
import classes from './slider-card.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MainTitle from '../../shared/MainTitle/main-title';
import Box from '@mui/material/Box';
import { loadWebsite } from '../../firebase';
import { extractGoogleDriveFileId } from '../../utils/utils';

const SliderCard = () => {
    const [news, setNews] = useState<any>(null);
    const containerRefs = useRef<any>([]);
    const [currentIndexes, setCurrentIndexes] = useState<any>({});

    const styles = {
        card: {
            position: 'relative',
            backgroundColor: 'rgb(28, 28, 30)',
            borderRadius: '16px',
            height: 'auto',
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
            borderRadius: '16px 16px 0 0',
        },
        content: {
            position: 'relative',
            backgroundColor: 'rgb(28, 28, 30)',
            color: 'white',
            padding: '10px',
            borderRadius: '0',
            paddingBottom: '16px',
        },
        content2: {
            position: 'relative',
            backgroundColor: 'rgb(28, 28, 30)',
            color: 'white',
            padding: '10px',
            borderRadius: '0 0 16px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };

    const handleScroll = (categoryIndex: any) => {
        const container: any = containerRefs.current[categoryIndex];
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        const cardWidth = container.offsetWidth;
        const newIndex = Math.round(scrollLeft / cardWidth);

        setCurrentIndexes((prev: any) => ({
            ...prev,
            [categoryIndex]: newIndex,
        }));
    };

    const scrollToIndex = (itemIndex: any, categoryIndex: any, length: any) => {
        const container: any = containerRefs.current[categoryIndex];
        if (!container) return;

        const cardWidth = container.offsetWidth;
        container.scrollTo({
            left: itemIndex + 1 === length ? length * cardWidth : itemIndex * cardWidth,
            behavior: 'smooth',
        });

        setCurrentIndexes((prev: any) => ({
            ...prev,
            [categoryIndex]: itemIndex,
        }));
    };

    const fetchNews = async () => {
        const response: any = await loadWebsite(`news`);
        if (response) {
            const sortedKeys = Object.keys(response)?.sort((a, b) => {
                const dateA = Date.parse(a);
                const dateB = Date.parse(b);
                if (!isNaN(dateA) && !isNaN(dateB)) return dateB - dateA;
                if (!isNaN(dateA)) return -1;
                if (!isNaN(dateB)) return 1;
                return 0;
            });
            const arrayObject: any = sortedKeys.map(key => response[key]);
            arrayObject?.forEach((_: any, i: number) => {
                setCurrentIndexes((prev: any) => ({
                    ...prev,
                    [i]: 0,
                }));
            });
            setNews(arrayObject);
        }
    };

    useEffect(() => {
        if (!news) {
            fetchNews().then((r) => r);
        }
    }, [news]);

    const getUrl = (driveUrl?: any) => {
        const fileId = extractGoogleDriveFileId(driveUrl);
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    };

    return (
        <>
            <div className={classes.grid}>
                <MainTitle title={'Discover'} size={'large'} />
                {news &&
                    news?.map((items: any, categoryIndex: number) => (
                        <Box
                            key={categoryIndex}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Box
                                ref={(el: any) => (containerRefs.current[categoryIndex] = el)}
                                onScroll={() => handleScroll(categoryIndex)}
                                sx={{
                                    display: 'flex',
                                    gap: 10,
                                    py: 1,
                                    overflowX: 'auto',
                                    width: '100%',
                                    scrollSnapType: 'x mandatory',
                                    '& > *': {
                                        scrollSnapAlign: 'center',
                                    },
                                    '::-webkit-scrollbar': {
                                        display: 'none',
                                    },
                                }}
                            >
                                {Object.values(items)?.map((x: any, i: number) => (
                                    <div className={classes.insideGrid} key={i}>
                                        <Card sx={styles.card} className={classes.cardStyle}>
                                            {x?.logo && (
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        height: 'auto',
                                                        width: '100%',
                                                    }}
                                                    image={getUrl(x?.logo)}
                                                />
                                            )}
                                            <CardContent sx={styles.content}>
                                                <h1 className={classes.title}>{x?.title}</h1>
                                                <span className={classes.content}>{x?.content}</span>
                                            </CardContent>
                                            <CardContent sx={styles.content2}>
                                                {/* Pagination */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                    }}
                                                >
                                                    {Object.values(items)?.map((_, dotIndex: any) => (
                                                        <span
                                                            key={dotIndex}
                                                            onClick={() =>
                                                                scrollToIndex(
                                                                    dotIndex,
                                                                    categoryIndex,
                                                                    Object.values(items)?.length
                                                                )
                                                            }
                                                            style={{
                                                                width: '10px',
                                                                height: '10px',
                                                                borderRadius: '50%',
                                                                backgroundColor:
                                                                    dotIndex === currentIndexes[categoryIndex] ||
                                                                    (dotIndex === 3 &&
                                                                        currentIndexes[categoryIndex] > dotIndex)
                                                                        ? '#007AFF'
                                                                        : 'lightgray',
                                                                cursor: 'pointer',
                                                                transition: 'background-color 0.3s',
                                                            }}
                                                        ></span>
                                                    ))}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </Box>
                        </Box>
                    ))}
            </div>
        </>
    );
};

export default SliderCard;
