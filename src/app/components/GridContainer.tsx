const GridContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='grid grid-cols-[repeat(10,_200px)] overflow-x-auto gap-4 no-scrollbar'>
      {children}
    </div>
  );
};

export default GridContainer;
