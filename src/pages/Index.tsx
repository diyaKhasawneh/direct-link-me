import { useParams } from "react-router-dom";
import LinkInBio from "@/components/LinkInBio";

const Index = () => {
  const { slug } = useParams<{ slug: string }>();
  return <LinkInBio slug={slug} />;
};

export default Index;