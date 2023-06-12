import dishes from './data.js';

const FilterCategory = ({ setCategory }) => {
  // Get all unique categories from the array of dishes
  const categories = [...new Set(dishes.map((dish) => dish.category))];

  return (
    <fieldset>
      <legend>Category</legend>
      <label htmlFor="all">
        <input
          type="radio"
          name="categories"
          id="all"
          value="all"
          onChange={(event) => setCategory(event.target.value)}
        />
        all
      </label>
      {categories.map((c) => (
        <label htmlFor={c} key={c}>
          <input
            type="radio"
            name="categories"
            id={c}
            value={c}
            onChange={(event) => setCategory(event.target.value)}
          />
          {c}
        </label>
      ))}
    </fieldset>
  );
};

export default FilterCategory;
