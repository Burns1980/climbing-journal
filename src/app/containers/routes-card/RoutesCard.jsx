import PropTypes from 'prop-types';
import { useState } from 'react';
import EllipsisMenu from '../../components/ellipsis-menu/EllipsisMenu';
import './routes-card.css';

const apiUrl = import.meta.env.VITE_API_URL;

const RoutesCard = ({ routeData }) => {
  const [showEllipsisMenu, setShowEllipsisMenu] = useState(false);

  function handleClick() {
    setShowEllipsisMenu((isMenuVisible) => !isMenuVisible);
  }

  function handleBlur(e) {
    console.dir('onblur');
    console.dir(e.target);
    console.dir(e.currentTarget);
    setShowEllipsisMenu(false);
  }

  return (
    <div className="route-card-container">
      <div className="ellipsis-container">
        <EllipsisMenu
          handleClick={handleClick}
          showEllipsisMenu={showEllipsisMenu}
          handleBlur={handleBlur}
        />
      </div>
      <article className="route-card">
        <div className="route-card-header">
          <img
            src={`${apiUrl}/${routeData.imageCover}`}
            alt="Brent hanging out on El Cap Tower"
            className="route-card-image"
          />
          <div className="route-card-details">
            <h3 className="route-card-title text-lg">
              {routeData.name}
              <span className="route-card-grade">{routeData.grade}</span>
            </h3>
            <p className="route-card-description text-sm">
              {routeData.description}
            </p>
          </div>
        </div>
        <div className="route-card-gear-beta">
          <h4 className="text-md">Gear beta</h4>
          <p className="text-sm">{routeData.gear}</p>
        </div>
        {/* <div className="route-card-carousel">Picture carousel goes here</div> */}
      </article>
    </div>
  );
};

RoutesCard.propTypes = {
  routeData: PropTypes.shape({
    imageCover: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    gear: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoutesCard;
