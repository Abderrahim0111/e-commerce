

const CategoryItem = ({ category, handleCategory, imageURL, categoryName }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        onClick={() => {
          handleCategory(category);
        }}
        className="w-36 h-36 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        <img src={imageURL} alt={categoryName} />
      </div>
      <h1 className="font-semibold">{categoryName}</h1>
    </div>
  );
};

export default CategoryItem;
