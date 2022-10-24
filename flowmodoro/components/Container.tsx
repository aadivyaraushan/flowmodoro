import { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Container: FC<Props> = ({ children }: Props) => {
  return (
    <>
      <div className=' w-screen items-center justify-center flex h-screen'>
        {children}
      </div>
    </>
  );
};

export default Container;
