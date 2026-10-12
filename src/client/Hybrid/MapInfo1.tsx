import React from 'react';

type Props = {
  slug?: string | number | null;
};

const MapInfo = ({ slug }: Props) => {
  if (!slug) return null;

  const groups = [
    {
      ids: [
        'florals-fedoras-brunch-benefit',
        3034,
        'florals-fedoras-brunch-benefit-1',
      ],
      image:
        'https://res.cloudinary.com/dfjbmdf1b/image/upload/f_auto,q_auto/Map_21_jqhzhp.jpg',
      alt: 'florals-fedoras-brunch-benefit',
    },
    {
      ids: ['4th-annual-sneaker-soiree-kicks-for-a-cause-1', 3004],
      image:
        'https://res.cloudinary.com/dzmrdbwqh/image/upload/v1771608334/eazyticks/Eventimg_p3kqtb.jpg',
      alt: '4th-annual-sneaker-soiree-kicks-for-a-cause',
    },
  ];

  const match = groups.find((group) => group.ids.includes(slug));

  if (!match) return null;

  return (
    <div className="relative mb-3">
      <img
        src={match.image}
        alt={match.alt}
        style={{
          maxWidth: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};

export default MapInfo;