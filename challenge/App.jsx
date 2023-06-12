import FilterPrice from './FilterPrice.jsx';
import FilterCategory from './FilterCategory.jsx';
import ListDishes from './ListDishes.jsx';
import { useState } from 'react';

function App() {
  const [maxPrice, setMaxPrice] = useState(9);
  const [category, setCategory] = useState('all');

  return (
    <main>
      <section aria-label="filters">
        <div className="sticky">
          <h1>Burger Place</h1>
          <form>
            <h2>Filter dishes</h2>

            <FilterPrice maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            <FilterCategory setCategory={setCategory} />
          </form>
        </div>
      </section>
      <section aria-label="dishes">
        <ListDishes maxPrice={maxPrice} category={category} />
      </section>
    </main>
  );
}

export default App;
