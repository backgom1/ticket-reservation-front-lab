// useSSE.ts
import {useEffect, useRef, useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

interface SSEMessage {
    type: string;
    data: any;
    timestamp: Date;
}

interface UseSSEReturn {
    isConnected: boolean;
    messages: SSEMessage[];
    currentCount: number | null;
    showPopup: boolean;
    connect: () => void;
    disconnect: () => void;
    closePopup: () => void;
}

export const useSSE = (eventId: number, userId: number): UseSSEReturn => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [messages, setMessages] = useState<SSEMessage[]>([]);
    const [currentCount, setCurrentCount] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const eventSourceRef = useRef<EventSource | null>(null);
    const navigate = useNavigate();

    const connect = useCallback(() => {
        if (eventSourceRef.current || !userId) return;

        const eventSource = new EventSource(
            `http://localhost:8080/api/v1/waiting/queue?eventId=${eventId}&userId=${userId}`
        );

        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            setIsConnected(true);
        };

        // 일반 메시지 처리
        eventSource.onmessage = (event) => {
            try {
                const data = event.data;

                // 숫자인지 확인 (카운트다운)
                if (!isNaN(Number(data))) {
                    const count = Number(data);
                    setCurrentCount(count);

                    // 카운트가 0이면 팝업 표시
                    if (count === 0) {
                        setShowPopup(true);
                    }

                    setMessages(prev => [...prev, {
                        type: 'countdown',
                        data: `카운트: ${count}`,
                        timestamp: new Date()
                    }]);
                } else {
                    // 일반 메시지
                    setMessages(prev => [...prev, {
                        type: 'message',
                        data: data,
                        timestamp: new Date()
                    }]);
                }
            } catch (error) {
                console.error('메시지 처리 오류:', error);
            }
        };

        // 특정 이벤트 타입 처리
        eventSource.addEventListener('connect', (event) => {
            console.log('Connected:', event.data);
        });

        eventSource.addEventListener('message', (event) => {
            setMessages(prev => [...prev, {
                type: 'message',
                data: event.data,
                timestamp: new Date()
            }]);
        });

        eventSource.addEventListener('broadcast', (event) => {
            setMessages(prev => [...prev, {
                type: 'broadcast',
                data: event.data,
                timestamp: new Date()
            }]);
        });

        eventSource.addEventListener('countdown', (event) => {
            const count = Number(event.data);
            setCurrentCount(count);

            if (count === 0) {
                // 팝업 표시
                setShowPopup(true);
            }

            setMessages(prev => [...prev, {
                type: 'countdown',
                data: `카운트: ${count}`,
                timestamp: new Date()
            }]);
        });

        eventSource.addEventListener('redirect', () => {
            // 팝업 표시
            setShowPopup(true);
        });

        eventSource.onerror = () => {
            setIsConnected(false);
        };
    }, [userId, navigate]);

    const disconnect = useCallback(() => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            setIsConnected(false);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            connect();
        }

        return () => {
            disconnect();
        };
    }, [userId, connect, disconnect]);

    const closePopup = useCallback(() => {
        setShowPopup(false);
    }, []);

    return {
        isConnected,
        messages,
        currentCount,
        showPopup,
        connect,
        disconnect,
        closePopup
    };
};