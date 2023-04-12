import { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Container: FC<Props> = ({ children }: Props) => {

    return (
    <>
        <div className='bg-white dark:bg-black text-black dark:text-white w-screen items-center justify-center flex h-screen'>
            {children}
        </div>
    </>
  );
};

export default Container;
