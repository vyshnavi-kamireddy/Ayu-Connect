import React, { useState, useEffect, useRef } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import getRecipeFromMistral from './Ai';
import Receipe from './Receipe';
import './chefclaude.css';

function Inputtext() {
  const [ingredient, setIngredient] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [response, setResponse] = useState("");
  const [load, setLoad] = useState(false);
  const receipeSection = useRef(null);

  useEffect(() => {
    if (response !== "" && receipeSection.current !== null) {
      receipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newIngredient = formData.get("ingredient");
    if (newIngredient.trim() !== "") {
      setIngredient((prev) => [...prev, newIngredient]);
    }
    e.target.reset();
  };

  const triggershown = async () => {
    setLoad(true);
    setIsShown(true);
    const result = await getRecipeFromMistral(ingredient);
    setResponse(result);
    setLoad(false);
  };

  return (
    <div className="page-wrapper">
      {/* Background Decorations */}
      <div className="leaf-bg top-left"></div>
      <div className="leaf-bg bottom-right"></div>

      {/* Header */}
      <header>
        <div className="logo">🌿 <span>AyuConnect</span></div>
        <p className="tagline">Rooted in Nature. Powered by Tradition.</p>
        <div className="search-container">
          <form onSubmit={handleSubmit} className="input-text">
            <input
              type="text"
              name="ingredient"
              placeholder="Search for symptoms (e.g., cold, headache)"
              className="chef-input"
              required
            />
            <button type="submit" className="chef-add-button">Add</button>
          </form>
        </div>
      </header>

      {/* Main Section */}
      <main>
        {ingredient.length > 0 && (
          <section className="display-section">
            <h1 className="ingredients-head">Symptoms:</h1>
            <ul className="un-list">
              {ingredient.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>

            {/* Button only */}
            <div className="button-wrapper" ref={receipeSection}>
              <button className="receipe-button" onClick={triggershown}>
                Find Natural Cure
              </button>
            </div>
          </section>
        )}

        {load && (
          <div className="load">
            <RotatingLines
              visible={true}
              height="60"
              width="60"
              color="#43a047"
              strokeWidth="4"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        )}

        {isShown && <Receipe response={response} />}
      </main>

      {/* Footer */}
      <footer>
        <p>© 2025 AyuConnect — Healing with Nature.</p>
      </footer>
    </div>
  );
}

export default Inputtext;
