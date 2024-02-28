/* eslint-disable react/prop-types */
import EllipsisMenu from '../ellipsis-menu/EllipsisMenu';
import noseImage from '../../assets/images/nose-thumbnail.jpg';
import './routes-card.css';

export default function RoutesCard({ routeData }) {
  return (
    <div className="route-card-container">
      <div className="ellipsis-container">
        <EllipsisMenu />
      </div>
      <article className="route-card">
        <div className="route-card-header">
          <img
            src={noseImage}
            alt="Brent hanging out on El Cap Tower"
            className="route-card-image"
          />
          <div className="route-card-details">
            <h3 className="route-card-title text-lg">
              {routeData.routeName}
              <span className="route-card-grade">{routeData.grade}</span>
            </h3>
            <p className="route-card-description text-sm">
              {routeData.description}
            </p>
          </div>
        </div>
        <div className="route-card-gear-beta">
          <h4 className="text-md">Gear beta</h4>
          <p className="text-sm">{routeData.gearDescription}</p>
        </div>
        <div className="route-card-carousel">Picture carousel goes here</div>
      </article>
    </div>
  );
}
