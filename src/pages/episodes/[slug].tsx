import { useRouter } from "next/router";

// import { Container } from './styles';

const Episode = () => {
  const router = useRouter();

  return <h1>{router.query.slug}</h1>;
};

export default Episode;
