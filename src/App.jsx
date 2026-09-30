import { useEffect, useState } from "react";
import "./App.css";

const destinations = [
  {
    id: 1,
    name: "Cubbon Park",
    location: "Central Bengaluru",
    category: "Parks & Nature",
    image:
      "https://pbs.twimg.com/media/D2Pj-x3WkAAX62s.jpg",
    description:
      "A peaceful green escape in the heart of Bengaluru, perfect for walks and relaxing.",
  },
  {
    id: 2,
    name: "Lalbagh Botanical Garden",
    location: "South Bengaluru",
    category: "Parks & Nature",
    image:
      "https://imgmedia.lbb.in/media/2018/08/5b68859d94deab1965749b4d_1533576605519.jpg",
    description:
      "A beautiful botanical garden famous for its greenery, glass house and flower displays.",
  },
  {
    id: 3,
    name: "Nandi Hills",
    location: "Near Bengaluru",
    category: "Parks & Nature",
image:
  "/images/nandi-hills.png",
    description:
      "A scenic hill destination known for sunrise views, cool weather and mountain roads.",
  },
  {
    id: 4,
    name: "Bannerghatta Biological Park",
    location: "South Bengaluru",
    category: "Parks & Nature",
    image:
  "/images/bannerghatta.png",
    description:
      "A wildlife destination featuring a zoo, safari, butterfly park and natural surroundings.",
  },
  {
    id: 5,
    name: "Bangalore Palace",
    location: "Vasanth Nagar",
    category: "Heritage",
    image:
      "https://www.mapsofindia.com/ci-moi-images/my-india/banglore.jpg",
    description:
      "A historic palace known for its Tudor-style architecture and grand interiors.",
  },
  {
    id: 6,
    name: "Vidhana Soudha",
    location: "Central Bengaluru",
    category: "Heritage",
    image:
      "https://wp-content.miviaje.com/2020/01/palacio-legislativo-bangalore.jpg",
    description:
      "One of Bengaluru's most recognizable landmarks, known for its impressive architecture.",
  },
  {
    id: 7,
    name: "Bangalore Fort",
    location: "KR Market",
    category: "Heritage",
    image:
      "https://tibotravels.wordpress.com/wp-content/uploads/2017/08/bangalore-fort-1.jpg",
    description:
      "A historic fort that offers a glimpse into Bengaluru's older architectural heritage.",
  },
  {
    id: 8,
    name: "Tipu Sultan's Summer Palace",
    location: "Old Bengaluru",
    category: "Heritage",
    image:
      "https://mediaim.expedia.com/destination/2/a949144d652fdf89ce05dc5ce857aae3.jpg",
    description:
      "A beautiful historic palace featuring traditional architecture and wooden craftsmanship.",
  },
  {
    id: 9,
    name: "Church Street",
    location: "Central Bengaluru",
    category: "Food & City Life",
    image: "/images/church-street.png",
    description:
      "A lively street filled with cafés, restaurants, bookstores and colourful city life.",
  },
  {
    id: 10,
    name: "Commercial Street",
    location: "Shivajinagar",
    category: "Food & City Life",
 image: "/images/commercial-street.png",
    description:
      "A popular shopping destination packed with fashion, accessories and local stores.",
  },
  {
    id: 11,
    name: "Indiranagar",
    location: "East Bengaluru",
    category: "Food & City Life",
    image:
      "https://static.wixstatic.com/media/e12793_9ce99d87e7234d5da44daa67da44089a~mv2.jpg/v1/fill/w_1000%2Ch_750%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01/e12793_9ce99d87e7234d5da44daa67da44089a~mv2.jpg",
    description:
      "A vibrant neighbourhood known for cafés, restaurants, nightlife and boutiques.",
  },
  {
    id: 12,
    name: "Koramangala",
    location: "South-East Bengaluru",
    category: "Food & City Life",
    image:
      "https://www.getbroker.in/areas/koramangala.jpg",
    description:
      "A lively neighbourhood with food spots, cafés, shopping and a youthful atmosphere.",
  },
  {
    id: 13,
    name: "Indian Music Experience Museum",
    location: "JP Nagar",
    category: "Art & Culture",
    image:
  "/images/ime-museum.png",
    description:
      "An interactive museum exploring India's rich musical traditions and history.",
  },
  {
    id: 14,
    name: "National Gallery of Modern Art",
    location: "Manekshaw Parade Ground",
    category: "Art & Culture",
    image:
      "https://www.holidify.com/images/cmsuploads/compressed/9719838200_a9b1bccdc5_k_20180319114147.jpg",
    description:
      "A cultural space showcasing modern Indian art in a peaceful heritage setting.",
  },
  {
    id: 15,
    name: "Visvesvaraya Museum",
    location: "Kasturba Road",
    category: "Art & Culture",
   image:
  "/images/visvesvaraya-museum.png",
    description:
      "An interactive science and technology museum with engaging exhibits and displays.",
  },
  {
    id: 16,
    name: "KR Market",
    location: "Kalassipalya",
    category: "Art & Culture",
    image:
  "/images/kr-market.png",
    description:
      "A colourful traditional market offering a lively glimpse into everyday Bengaluru.",
  },
];

const categories = [
  "All",
  "Parks & Nature",
  "Heritage",
  "Food & City Life",
  "Art & Culture",
];

function App() {
  const [activePage, setActivePage] = useState("home");
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("wanderlyFavorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      return [];
    }
  });
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
    submittedBy: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem("wanderlyFavorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(
        favorites.filter((favoriteId) => favoriteId !== id)
      );
    } else {
      setFavorites([...favorites, id]);
    }
  }

  const filteredDestinations = destinations.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.location.toLowerCase().includes(search.toLowerCase()) ||
      place.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function goToPage(page) {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openPlaceDetails(place) {
    setSelectedPlace(place);
    setActivePage("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  }

  function handleSuggestSubmit(event) {
    event.preventDefault();

    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Please enter the place name.";
    }

    if (!formData.location.trim()) {
      errors.location = "Please enter the location.";
    }

    if (!formData.category) {
      errors.category = "Please select a category.";
    }

    if (!formData.description.trim()) {
      errors.description = "Please describe the place.";
    } else if (formData.description.trim().length < 20) {
      errors.description = "Description should be at least 20 characters.";
    }

    if (!formData.submittedBy.trim()) {
      errors.submittedBy = "Please enter your name.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
    }
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">✦</span>
          <span>Wanderly</span>
        </div>

        <nav className="nav-links">

          <button
            className={activePage === "home" ? "active" : ""}
            onClick={() => goToPage("home")}
          >
            Home
          </button>

          <button
            className={activePage === "explore" ? "active" : ""}
            onClick={() => goToPage("explore")}
          >
            Explore
          </button>

          <button
            className={activePage === "favorites" ? "active" : ""}
            onClick={() => goToPage("favorites")}
          >
            Favourites
          </button>

          <button
            className={activePage === "suggest" ? "active" : ""}
            onClick={() => goToPage("suggest")}
          >
            Suggest a Place
          </button>

        </nav>

        <div className="nav-actions">

          <button
            className="icon-btn"
            onClick={() => goToPage("explore")}
          >
            ⌕
          </button>

          <button
            className="heart-btn"
            onClick={() => goToPage("favorites")}
          >
            ♡
          </button>

        </div>
      </header>


      {/* HOME PAGE */}

      {activePage === "home" && (
        <>

          <section className="hero">

            <div className="hero-content">

              <p className="eyebrow">
                BENGALURU • DISCOVER • EXPLORE
              </p>

              <h1>
                Your Bangalore,
                <br />
                beyond the usual.
              </h1>

              <p className="hero-text">
                Discover hidden corners, iconic landmarks,
                peaceful escapes and local favourites around
                Bengaluru.
              </p>

              <div className="search-box">

                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search Bangalore..."
                  onFocus={() => goToPage("explore")}
                />

                <button
                  onClick={() => goToPage("explore")}
                >
                  ⌕
                </button>

              </div>

            </div>

          </section>


          <section className="categories">

            <button
              className="category-card"
              onClick={() => {
                setSelectedCategory("Parks & Nature");
                goToPage("explore");
              }}
            >
              <span>🌿</span>

              <div>
                <strong>Parks & Nature</strong>
                <small>4 places</small>
              </div>
            </button>

            <button
              className="category-card"
              onClick={() => {
                setSelectedCategory("Heritage");
                goToPage("explore");
              }}
            >
              <span>🏛️</span>

              <div>
                <strong>Heritage</strong>
                <small>4 places</small>
              </div>
            </button>

            <button
              className="category-card"
              onClick={() => {
                setSelectedCategory("Food & City Life");
                goToPage("explore");
              }}
            >
              <span>☕</span>

              <div>
                <strong>Food & City Life</strong>
                <small>4 places</small>
              </div>
            </button>

            <button
              className="category-card"
              onClick={() => {
                setSelectedCategory("Art & Culture");
                goToPage("explore");
              }}
            >
              <span>🎨</span>

              <div>
                <strong>Art & Culture</strong>
                <small>4 places</small>
              </div>
            </button>

          </section>


          <section className="featured-section">

            <div className="section-heading">

              <div>

                <p className="section-label">
                  BENGALURU FAVOURITES
                </p>

                <h2>
                  Places Worth Exploring
                </h2>

              </div>

              <button
                className="view-all"
                onClick={() => goToPage("explore")}
              >
                Explore All →
              </button>

            </div>


            <div className="destination-grid">

              {destinations.slice(0, 4).map((place) => (

                <DestinationCard
                  key={place.id}
                  place={place}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  openPlaceDetails={openPlaceDetails}
                />

              ))}

            </div>

          </section>

        </>
      )}


      {/* EXPLORE PAGE */}

      {activePage === "explore" && (

        <section className="explore-page">

          <div className="explore-header">

            <p className="section-label">
              DISCOVER BENGALURU
            </p>

            <h1>
              Explore the City
            </h1>

            <p>
              From peaceful parks to buzzing streets,
              discover Bengaluru your way.
            </p>


            <div className="explore-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search places, areas or categories..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <button>
                ⌕
              </button>

            </div>

          </div>


          <div className="filter-row">

            {categories.map((category) => (

              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "filter-btn selected"
                    : "filter-btn"
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>

            ))}

          </div>


          <div className="explore-results">

            <div className="results-heading">

              <h2>
                Places to Explore
              </h2>

              <span>
                {filteredDestinations.length} places
              </span>

            </div>


            {filteredDestinations.length > 0 ? (

              <div className="destination-grid">

                {filteredDestinations.map((place) => (

                  <DestinationCard
                    key={place.id}
                    place={place}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    openPlaceDetails={openPlaceDetails}
                  />

                ))}

              </div>

            ) : (

              <div className="empty-state">

                <div>⌕</div>

                <h3>
                  No places found
                </h3>

                <p>
                  Try another search or category.
                </p>

              </div>

            )}

          </div>

        </section>

      )}


      {/* PLACE DETAILS PAGE */}

      {activePage === "details" && selectedPlace && (

        <section className="details-page">

          <button
            className="back-button"
            onClick={() => goToPage("explore")}
          >
            ← Back to Explore
          </button>

          <div className="details-card">

            <div className="details-image">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
              />
            </div>

            <div className="details-content">

              <p className="section-label">
                {selectedPlace.category.toUpperCase()}
              </p>

              <h1>{selectedPlace.name}</h1>

              <p className="details-location">
                📍 {selectedPlace.location}
              </p>

              <p className="details-description">
                {selectedPlace.description}
              </p>

              <div className="details-info">
                <div>
                  <strong>Why visit?</strong>
                  <span>Discover one of Bengaluru's places worth exploring.</span>
                </div>
              </div>

              <button
                className={
                  favorites.includes(selectedPlace.id)
                    ? "details-favorite liked"
                    : "details-favorite"
                }
                onClick={() => toggleFavorite(selectedPlace.id)}
              >
                {favorites.includes(selectedPlace.id) ? "♥ Saved to Favourites" : "♡ Add to Favourites"}
              </button>

            </div>

          </div>

        </section>

      )}


      {/* FAVOURITES PAGE */}

      {activePage === "favorites" && (

        <section className="favorites-page">

          <p className="section-label">
            YOUR SAVED PLACES
          </p>

          <h1>
            Your Favourite Places ♡
          </h1>

          <p className="page-description">
            Keep the Bangalore places you want to remember
            for your next adventure.
          </p>


          {favorites.length > 0 ? (

            <div className="destination-grid">

              {destinations
                .filter((place) =>
                  favorites.includes(place.id)
                )
                .map((place) => (

                  <DestinationCard
                    key={place.id}
                    place={place}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    openPlaceDetails={openPlaceDetails}
                  />

                ))}

            </div>

          ) : (

            <div className="empty-state">

              <div>♡</div>

              <h3>
                No favourites yet
              </h3>

              <p>
                Explore Bangalore and tap the heart
                to save places you love.
              </p>

              <button
                className="primary-button"
                onClick={() => goToPage("explore")}
              >
                Explore Places
              </button>

            </div>

          )}

        </section>

      )}


      {/* SUGGEST PAGE */}

      {activePage === "suggest" && (

        <section className="suggest-page">

          <p className="section-label">
            KNOW A HIDDEN GEM?
          </p>

          <h1>
            Suggest a Place
          </h1>

          <p className="page-description">
            Know a Bangalore spot that deserves more attention?
            Share it with the Wanderly community.
          </p>

          {formSubmitted ? (

            <div className="suggest-box success-box">

              <p>✓</p>

              <h2>
                Thanks for the suggestion!
              </h2>

              <span>
                Your place recommendation has been submitted successfully.
              </span>

              <button
                className="primary-button"
                onClick={() => {
                  setFormData({
                    name: "",
                    location: "",
                    category: "",
                    description: "",
                    submittedBy: "",
                  });
                  setFormErrors({});
                  setFormSubmitted(false);
                }}
              >
                Suggest Another Place
              </button>

            </div>

          ) : (

            <form
              className="suggest-form"
              onSubmit={handleSuggestSubmit}
              noValidate
            >

              <div className="form-group">
                <label htmlFor="name">Place Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Sankey Tank"
                  value={formData.name}
                  onChange={handleFormChange}
                />
                {formErrors.name && (
                  <small className="form-error">{formErrors.name}</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Malleshwaram"
                  value={formData.location}
                  onChange={handleFormChange}
                />
                {formErrors.location && (
                  <small className="form-error">{formErrors.location}</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                >
                  <option value="">Select a category</option>
                  <option value="Parks & Nature">Parks & Nature</option>
                  <option value="Heritage">Heritage</option>
                  <option value="Food & City Life">Food & City Life</option>
                  <option value="Art & Culture">Art & Culture</option>
                </select>
                {formErrors.category && (
                  <small className="form-error">{formErrors.category}</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Why should people visit? *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="Tell us what makes this place special..."
                  value={formData.description}
                  onChange={handleFormChange}
                ></textarea>
                {formErrors.description && (
                  <small className="form-error">{formErrors.description}</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="submittedBy">Your Name *</label>
                <input
                  id="submittedBy"
                  name="submittedBy"
                  type="text"
                  placeholder="e.g. Varadha"
                  value={formData.submittedBy}
                  onChange={handleFormChange}
                />
                {formErrors.submittedBy && (
                  <small className="form-error">{formErrors.submittedBy}</small>
                )}
              </div>

              <button
                className="primary-button submit-button"
                type="submit"
              >
                Submit Suggestion →
              </button>

            </form>

          )}

        </section>

      )}

    </div>
  );
}


/* DESTINATION CARD */

function DestinationCard({
  place,
  favorites,
  toggleFavorite,
  openPlaceDetails,
}) {

  const isFavorite =
    favorites.includes(place.id);

  return (

    <div
      className="destination-card"
      onClick={() => openPlaceDetails(place)}
    >

      <div className="destination-image">

        <img
          src={place.image}
          alt={place.name}
        />

        <button
          className={
            isFavorite
              ? "favorite-button liked"
              : "favorite-button"
          }
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(place.id);
          }}
        >
          {isFavorite ? "♥" : "♡"}
        </button>

      </div>


      <div className="destination-info">

        <h3>
          {place.name}
        </h3>

        <p className="location">
          📍 {place.location}
        </p>

        <p className="description">
          {place.description}
        </p>

        <span className="category-tag">
          {place.category}
        </span>

      </div>

    </div>

  );
}

export default App;