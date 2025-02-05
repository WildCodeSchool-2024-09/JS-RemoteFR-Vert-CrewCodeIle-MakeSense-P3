// import { useEffect, useState } from "react";

// export default function AnimatorsList({ id }) {
//   const [animators, setAnimators] = useState([]);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/user`)
//       .then((response) => response.json())
//       .then((data) => {
//         setAnimators(data);
//       });
//   }, []);

//   return (
//     animators.length > 0 && (
//       <section>
//         {animators.map((animator) => (
//           <article key={animator.id}>
//             <p>
//               {animator.firstname} coucou{animator.lastname}
//             </p>
//           </article>
//         ))}
//       </section>
//     )
//   );
// }
