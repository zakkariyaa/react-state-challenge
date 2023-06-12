import dishes from './data.js';

const ListDishes = ({ maxPrice, category }) => {
  const minDishes = dishes.filter(
    (dish) =>
      dish.price <= maxPrice &&
      (dish.category === category || category === 'all')
  );

  return (
    <ul className="grid">
      {minDishes.map((dish) => (
        <li key={dish.id} className="card">
          <h3>{dish.name}</h3>
          {dish.description && <p>{dish.description}</p>}
          <div>£{dish.price.toFixed(2)}</div>
        </li>
      ))}
    </ul>
  );
};

export default ListDishes;
