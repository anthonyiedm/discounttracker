// src/components/DiscountTracker/FilterBar.tsx
import React, { useState } from 'react';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  dateRange: [Date | null, Date | null];
  status: string;
  type: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: [null, null],
    status: 'all',
    type: 'all'
  });

  const handleChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      <DateRangePicker
        value={filters.dateRange}
        onChange={(dates) => handleChange('dateRange', dates)}
        className="w-72"
      />
      
      <Select
        value={filters.status}
        onChange={(e) => handleChange('status', e.target.value)}
        className="w-40"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="scheduled">Scheduled</option>
        <option value="expired">Expired</option>
      </Select>
      
      <Select
        value={filters.type}
        onChange={(e) => handleChange('type', e.target.value)}
        className="w-40"
      >
        <option value="all">All Types</option>
        <option value="percentage">Percentage</option>
        <option value="fixed">Fixed Amount</option>
        <option value="bogo">BOGO</option>
      </Select>
      
      <Button
        variant="outlined"
        onClick={() => {
          setFilters({
            dateRange: [null, null],
            status: 'all',
            type: 'all'
          });
          onFilterChange({
            dateRange: [null, null],
            status: 'all',
            type: 'all'
          });
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

// src/components/ReviewBanner/RatingStars.tsx
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  color?: string;
  onChange?: (rating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = 24,
  color = '#FFB800',
  onChange
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const isActive = index < fullStars;
        const isHalf = !isActive && index === fullStars && hasHalfStar;
        
        return (
          <button
            key={index}
            className="focus:outline-none"
            onClick={() => onChange?.(index + 1)}
            type="button"
          >
            {isHalf ? (
              <StarHalf size={size} color={color} fill={color} />
            ) : (
              <Star
                size={size}
                color={color}
                fill={isActive ? color : 'transparent'}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};