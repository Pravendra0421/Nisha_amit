
import React from 'react';
import BookSangeet from './(_component)/updateForm';

const Page = async ({ params }: { params:Promise<{ id: string }> }) => {
    const {id} = await params
  return (
    <div>
      <BookSangeet id={id}  /> 
    </div>
  );
};

export default Page;
