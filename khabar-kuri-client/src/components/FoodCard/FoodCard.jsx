const FoodCard = ({item}) => {
    const {name,image,price,recipe}=item;
  
    const handleAddToCart=food=>{
        // console.log(food)
    }
    return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        
        <img
          src={image}
          alt="Shoes"
        />
        
      </figure>
      <p className=" absolute right-0 mr-4 mt-4  px-4 bg-slate-900 text-white ">${price}</p>
      <div className="card-body flex flex-col items-center text-center ">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button onClick={()=>handleAddToCart(item)} className="btn btn-outline uppercase bg-slate-100 border-0 border-b-4 border-orange-300 hover:bg-gray-700 hover:text-white">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
