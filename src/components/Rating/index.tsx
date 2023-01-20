import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

type Props = {
  rate: number;
  count: number;
};

const Rating = ({ rate, count }: Props) => {
  return (
    <div className="mt-6">
      <h4 className="sr-only">Reviews</h4>
      <div className="flex items-center">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={clsx('h-5 w-5 flex-shrink-0', {
                'text-gray-900': rate > rating,
                'text-gray-200': rate <= rating,
              })}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">{rate} out of 5 stars</p>
        <a
          href="#"
          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {count} reviews
        </a>
      </div>
    </div>
  );
};

export default Rating;
