import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

type Props = {};

const About = (props: Props) => {
  const location = useLocation();

  console.log(location.state);

  return <div>About</div>;
};

export default About;
