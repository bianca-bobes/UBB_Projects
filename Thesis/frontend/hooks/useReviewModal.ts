import { useState } from 'react';

export function useReviewModal() {
  const [showReview, setShowReview] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [selectedType, setSelectedType] = useState<'dream' | 'dejavu' | null>(null);

  const open = (text: string) => {
    setReviewText(text);
    setSelectedType(null);
    setShowReview(true);
  };

  const close = () => {
    setShowReview(false);
    setReviewText('');
    setSelectedType(null);
  };

  return {
    showReview,
    reviewText,
    selectedType,
    setReviewText,
    setSelectedType,
    open,
    close,
  };
}
