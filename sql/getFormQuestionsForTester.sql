-- | TestData (Tests && UxResearchers/Users) | Questions_Sections | Options | 
-- | testName | testype| testDesc|testCreator| isSection|name|desc|name|value|

SELECT T.name AS testName,
       T.type AS testType,
       U.name AS testCreator,
       T.description AS testDescription,
       Q_S.id AS "Q_S-id",
       Q_S.name AS "Q_S-name",
       Q_S.description AS "Q_S-description",
       Q_S."isSection" AS "Q_S-isSection",
       O.id AS "O-id",
       O.name AS "O-name",
       O.image AS "O-image"
FROM "Tests" T
LEFT JOIN "Users" U ON T."userId"=U.id
LEFT JOIN "Questions_Sections" Q_S ON Q_S."testId"=T.id
LEFT JOIN "Options" O ON O."questionId"=Q_S.id
WHERE T.id='1'
ORDER BY Q_S.id ASC, O.id ASC

