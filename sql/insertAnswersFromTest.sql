-- userId, formData.q_s
--                -> forEach return "(userId, q_s.questionId, q_s.answer)"
query =
INSERT INTO public."Answers"("userId", "questionId", answer)
VALUES (?, ?, ?) --  <- Append da string aqui