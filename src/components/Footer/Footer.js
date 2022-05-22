function Footer() {
  const date = new Date();
  return (
    <footer className="footer">
      <p className="footer__text">
        <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />{" "}
        {date.getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
