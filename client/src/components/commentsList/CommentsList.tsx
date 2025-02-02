import { useEffect, useState } from "react";
import style from "./commentsList.module.css";

type CommentType = {
  content: string;
  firstname: string;
  lastname: string;
};

export default function CommentsList({ id }: { id: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/decision/comment/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, [id]);

  return (
    comments.length > 0 && (
      <section className={style.container}>
        {comments.map((comment) => (
          <article key={comment.content} className={style.comment}>
            <p>
              {comment.firstname} {comment.lastname}
            </p>
            <p>{comment.content}</p>
          </article>
        ))}
      </section>
    )
  );
}
