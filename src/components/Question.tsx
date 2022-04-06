import "../styles/question.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};

export function Question({ content, author }: QuestionProps) {
  return (
    <div className="question">
      <p className="">{content}</p>
      <footer>
        <div className="user-infor">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div></div>
      </footer>
    </div>
  );
}
