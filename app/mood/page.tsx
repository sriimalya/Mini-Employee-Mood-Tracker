"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function MoodPage() {
    const moods = [
        {
            value: 'happy',
            emoji: '😄',
            label: 'Happy',
            color: 'bg-green-100 hover:bg-green-200 border-green-300'
        },
        {
            value: 'neutral',
            emoji: '😐',
            label: 'Neutral',
            color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300'
        },
        {
            value: 'sad',
            emoji: '😢',
            label: 'Sad',
            color: 'bg-blue-100 hover:bg-blue-200 border-blue-300'
        },
    ];

    const [selectedMood, setSelectedMood] = useState<string>('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMood) return alert("Select a mood first!");
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/mood", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ selectedMood, comment }),
            })

            if (response.ok) {
                setSubmitted(true)
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            }
        } catch (error) {
            console.error("Error submitting mood:", error);
            alert("Failed to submit mood. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="flex flex-col items-center text-center space-y-4">
                    <Card className="w-full max-w-md text-center">
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                            <p className="text-lg font-medium">Your mood has been recorded successfully! Take care.</p>
                        </CardContent>
                    </Card>
                    <p className="text-sm text-muted-foreground">Redirecting you back to home...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-1 items-center justify-center min-h-full px-4">
            <div className="space-y-6 max-w-md w-full text-center">

                <h2 className="text-3xl font-bold">
                    So! how are you feeling today?
                </h2>
                <div>
                    <label className="text-lg font-semibold block mb-2">
                        Select Your Mood
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {moods.map((mood) => (
                            <button
                                key={mood.value}
                                type="button"
                                onClick={() => setSelectedMood(mood.value)}
                                className={`p-6 rounded-lg border-2 transition-all ${selectedMood === mood.value
                                    ? `${mood.color} border-opacity-100 scale-105`
                                    : 'bg-white hover:bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <div className="text-4xl mb-2">{mood.emoji}</div>
                                <div className="font-medium dark:text-black ">{mood.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-lg font-medium mb-2 block">Want to say more? Write here..</label>
                    <Textarea
                        placeholder="Tell us more about how you're feeling..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!selectedMood || isSubmitting}
                    onClick={handleSubmit}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Mood'}
                </Button>
            </div>
        </div>
    );
}
