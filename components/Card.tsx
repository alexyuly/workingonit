import { useEffect, useState } from 'react';

type Status = 'inactive' | 'active' | 'done';

const guard = (status: never): never => {
  throw new Error(`Color not defined for status ${status}`);
};

const mapStatusToBackgroundColor = (status: Status): string => {
  switch (status) {
    case 'inactive': return 'bg-sky-800';
    case 'active': return 'bg-yellow-800';
    case 'done': return 'bg-emerald-800';
    default: guard(status);
  }
};

const mapStatusToBorderColor = (status: Status): string => {
  switch (status) {
    case 'inactive': return 'border-sky-700';
    case 'active': return 'border-yellow-700';
    case 'done': return 'border-emerald-700';
    default: guard(status);
  }
};

const mapStatusToButtonIconName = (status: Status): string => {
  switch (status) {
    case 'inactive': return 'enable';
    case 'active': return 'check_circle';
    case 'done': return 'unpublished';
    default: guard(status);
  }
};

interface Props {
  createdTimestamp: number
  isNew?: boolean
  status: Status
  text: string
}

const Card = ({
  isNew,
  status,
  text,
}: Props) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const backgroundColor = mapStatusToBackgroundColor(status);
  const borderColor = mapStatusToBorderColor(status);
  const buttonIconName = mapStatusToButtonIconName(status);

  return (
    <section
      className={`${backgroundColor} border ${borderColor} cursor-pointer m-4 p-4 rounded shadow text-white`}
      style={{
        marginTop: isNew && !isMounted ? -50 : 0,
        opacity: isNew && !isMounted ? 0 : 1,
        transitionDuration: '500ms',
        transitionProperty: 'margin-top, opacity',
        transitionTimingFunction: 'ease-out',
      }}
    >
      <span className="flex flex-row items-center justify-between">
        <span className="cursor-text">
          {text}
        </span>
        <button>
          <span className="align-middle material-symbols-outlined ml-2">
            {buttonIconName}
          </span>
        </button>
      </span>
    </section>
  )
}

export default Card;
