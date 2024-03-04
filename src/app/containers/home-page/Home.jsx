import PageWrapper from '../../routes/PageWrapper';
import noseImage from '../../assets/images/nose-thumbnail.jpg';
import logo from '../../assets/images/climbing-bag-logo.jpg';

export default function Home() {
  return (
    <PageWrapper title="Home" className="container">
      <img src={noseImage} alt="Me hanging out at El Cap tower" />
      <img src={logo} width={'100px'} alt="Climbing bag logo" />
    </PageWrapper>
  );
}
