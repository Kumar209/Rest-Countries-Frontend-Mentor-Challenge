import Header from "./Header";
import { useState } from "react";
import Countries from "./Countries";
import Country from "./Country";
import { Routes, Route } from "react-router-dom";
import useFetch from "./useFetch";

function App() {
  const [inputField, setInputField] = useState(undefined);
  const [search, setSearch] = useState();
  const [filtra, setFilter] = useState("All");

  const { data } = useFetch("https://restcountries.com/v2/all");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputField);
  };

  const handleSelect = (e) => {
    setFilter(e.target.value);
    setSearch(undefined);
    setInputField("");
  };

  const getCountryName = (code) => {
    let countryName;
    const country = data.filter((element) => {
      // return element.alpha3Code === code;
      if (element.alpha3Code === code) {
        return element;
      }
    });

    countryName = country[0].name;
    // countryName = country.name;
    return countryName;
  };

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    // <Router>
      <>
        <div className="App">
          <Header />

          <Routes>
            <Route
              exact
              path="/Rest-Countries-Frontend-Mentor-Challenge"
              element={
                <>
                  <div className="container">
                    <form onSubmit={handleSubmit}>
                      <div className="inputField">
                        <input
                          type="search"
                          placeholder="Search for a country..."
                          value={inputField}
                          onChange={(e) => {
                            setInputField(e.target.value);
                            setSearch(e.target.value);
                          }}
                        />
                        <i className="fas fa-search"></i>
                      </div>
                      <select id="region" name="region" onChange={handleSelect}>
                        <option value="All" defaultValue>
                          All
                        </option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                      </select>
                    </form>
                  </div>

                  <Countries
                    filtra={filtra}
                    input={search}
                    numberWithCommas={numberWithCommas}
                  />
                </>
              }
            />

            {/*eslint-disable-next-line react/no-children-prop */}
            {/* <Route path="/:countryName" children={<Country numberWithCommas={numberWithCommas} getCountryName={getCountryName}/>} /> */}

            <Route
              path="/:countryName"
              element={
                <Country
                  numberWithCommas={numberWithCommas}
                  getCountryName={getCountryName}
                />
              }
            />
          </Routes>
        </div>
      </>
    // {/* </Router> */}
  );
}

export default App;
