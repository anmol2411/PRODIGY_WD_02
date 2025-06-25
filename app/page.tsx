'use client'
import React, {useState, useRef} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Scroll} from "lucide-react";

function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = String(ms % 1000).padStart(3, "0");
    return `${minutes}:${seconds}.${milliseconds.slice(0, 2)}`;
}

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = () => {
        if (running) return;
        setRunning(true);
        const startTime = Date.now() - time;
        intervalRef.current = setInterval(() => {
            setTime(Date.now() - startTime);
        }, 10);
    };

    const pause = () => {
        setRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const reset = () => {
        pause();
        setTime(0);
        setLaps([]);
    };

    const lap = () => {
        if (!running) return;
        setLaps((prev) => [time, ...prev]);
    };

    return (
        <div className='flex w-full h-svh justify-center items-center'>
            <Card className="max-w-md w-full mx-6 p-8 shadow-lg">
                <CardContent className="flex flex-col items-center space-y-8">
                    <div className="text-3xl font-mono">{formatTime(time)}</div>
                    <div className="flex space-x-2">
                        {running ? (
                            <Button variant="destructive" onClick={pause}>
                                Pause
                            </Button>
                        ) : (
                            <Button onClick={start}>Start</Button>
                        )}
                        <Button variant="secondary" onClick={reset}>
                            Reset
                        </Button>
                        <Button variant="outline" onClick={lap} disabled={!running}>
                            Lap
                        </Button>
                    </div>
                    <div className='relative overflow-y-auto max-h-[60svh] w-full'>
                        <Table>
                            <TableHeader className='shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.1)]'>
                                <TableRow>
                                    <TableHead>Lap</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {laps.map((lapTime, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{laps.length - index}</TableCell>
                                        <TableCell>{formatTime(lapTime)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Stopwatch;
