const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="section-title">
      <p className="section-subtitle">{subHeading}</p>
      <h2 className="section-heading">{heading}</h2>
    </div>
  );
};

export default SectionTitle;