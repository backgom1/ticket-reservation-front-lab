import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import Slider from 'react-slick'; // react-slick 임포트
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// react-slick의 필수 CSS 임포트
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- (이전과 동일한 인터페이스 및 데이터) ---
interface ItemProps {
    name: string;
    description: string;
    date: string;
    image: string;
}
interface ItemComponentProps {
    item: ItemProps;
}
const items: ItemProps[] = [
    {
        name: "홋카이도 닛폰햄 파이터즈",
        description: "정규리그 입장권",
        date: "2025.04.01 - 2025.09.23",
        image: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/baseball-bat-ball.svg"
    },
    {
        name: "다른 이벤트 이름",
        description: "특별 할인 티켓",
        date: "2025.10.01 - 2025.10.15",
        image: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/ticket.svg"
    },
];

// ✅ 1. 커스텀 화살표 컴포넌트 정의
// react-slick에서 props (className, style, onClick)를 내려주므로 이를 받아 사용합니다.
const NextArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', right: 25 }}
            onClick={onClick}
        >
            <ArrowForwardIosIcon style={{ color: 'black' }} />
        </div>
    );
}

const PrevArrow = (props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', left: 25, zIndex: 1 }}
            onClick={onClick}
        >
            <ArrowBackIosIcon style={{ color: 'black' }} />
        </div>
    );
}


export const DraggableCarousel: React.FC = () => {
    const settings = {
        dots: true, // 하단 인디케이터 표시
        infinite: true, // 무한 루프
        speed: 500, // 전환 속도
        slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
        swipeToSlide: true, // 드래그(스와이프) 기능
        draggable: true,
        nextArrow: <NextArrow />, // 커스텀 다음 화살표
        prevArrow: <PrevArrow />, // 커스텀 이전 화살표
    };

    return (
        <Box sx={{ p: 5, width: "100%", boxSizing: "border-box", maxWidth: '900px', margin: 'auto' }}>
            {/* ✅ 3. Carousel을 Slider로 교체하고 settings 전달 */}
            <Slider {...settings}>
                {items.map((item, i) => (
                    // 각 슬라이드는 div로 한 번 감싸주는 것이 좋습니다.
                    <Box key={i} sx={{ padding: '0 10px' }}>
                        <Item item={item} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

// --- (Item 컴포넌트는 이전과 동일) ---
const Item: React.FC<ItemComponentProps> = ({ item }) => {
    return (
        <Paper
            sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: 4,
                background: '#f5f5f5',
                borderRadius: '10px',
                overflow: 'hidden',
            }}
            elevation={4}
        >
            <Box>
                <Typography variant="h4" component="h2" fontWeight="bold">
                    {item.name}
                </Typography>
                <Typography variant="h6">{item.description}</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
                    {item.date}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                    예매하기
                </Button>
            </Box>
            <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                    width: 150,
                    height: 150,
                    filter: 'invert(0.5)'
                }}
            />
        </Paper>
    );
}