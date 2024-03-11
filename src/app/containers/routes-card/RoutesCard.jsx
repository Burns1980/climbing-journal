import PropTypes from 'prop-types';
import { useState } from 'react';
import { EllipsisMenu, TruncateText } from '../../components';
import './routes-card.css';
import { apiUrl } from '../../../utils/envVars';

const RoutesCard = ({ routeData }) => {
  const [showEllipsisMenu, setShowEllipsisMenu] = useState(false);

  function handleClick() {
    console.log('inside handleClick');
    setShowEllipsisMenu((isMenuVisible) => !isMenuVisible);
  }

  function handleReadMoreClick() {
    console.log('inside read more handleClick');
  }

  return (
    <div className="route-card-container">
      <div className="ellipsis-container">
        <EllipsisMenu
          handleClick={handleClick}
          showEllipsisMenu={showEllipsisMenu}
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
            <TruncateText
              className="route-card-description text-sm"
              // text={routeData.description}
              text={routeData.description}
              maxWords={100}
              onClick={handleReadMoreClick}
            />
          </div>
        </div>
        <div className="route-card-gear-beta">
          <h4 className="text-md">Gear beta</h4>
          <p className="text-sm">{routeData.gear}</p>
        </div>
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
