// import { useState } from "react";
// import { createQuestionnaire } from "../../services/api";
// import styles from "./QuestionnaireForm.module.css";

// const QuestionnaireForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [question, setQuestion] = useState("");
//   const [type, setType] = useState("text");

//   const types = ["single choice", "multiple choices"];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createQuestionnaire({ name, description, questions: [] });
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.wrapper}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Questionnaire Name"
//         required
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//       />

//       <div className={styles.questionwrapper}>
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Enter your question"
//           required
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="text">text</option>
//           {types.map((t) => (
//             <option key={t} value={t}>
//               {t}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className={styles.answer}>
//         {type === "text" && (
//           <textarea
//             value={question}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//           />
//         )}
//       </div>
//       <button type="submit">Create</button>
//     </form>
//   );
// };

// export default QuestionnaireForm;
