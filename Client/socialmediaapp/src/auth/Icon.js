import React from 'react';

const Icon = ({ width, height, fill }) => {
    return (
        <svg viewBox="0 0 24 24" width={width} height={height} fill={fill}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 4c-4.41 0-8 3.58-8 8s3.58 8 8 8c2.05 0 3.93-.76 5.35-2.01l-2.09-1.99c-.74.65-1.67 1.04-2.66 1.04c-2.2 0-4-1.79-4-4s1.8-4 4-4c1.02 0 1.96.39 2.68 1.03l2.07-2.01C15.93 4.78 14.05 4 12 4m8.94 7h-2.02v2.02h-2.02V11h-2.02v-2.02h2.02V7h2.02v2.02h2.02V11z" />
        </svg>
    );
};

export default Icon;
