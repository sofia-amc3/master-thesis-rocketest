-- userId, formData.q_s
--                -> forEach return "(userId, q_s.questionId, q_s.answer)"

INSERT INTO public."Answers"(
	"userId", "questionId", answer)
	VALUES (?, ?, ?); --  <- Append da string aqui