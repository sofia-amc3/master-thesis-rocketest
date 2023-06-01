SELECT DISTINCT T.ID,
                T."name" AS "testName",
                T."type" AS "testType",
                T.DEADLINE AS "testDeadline",
                U."name" AS "testCreator",
                T.PAYMENT AS "testPayment"
FROM "Tests" T
  WHERE T."isPublic" = TRUE
    AND T."isDeleted" = FALSE;
--------------------------------------------------------------

SELECT DISTINCT T.ID,
                T."name" AS "testName",
                T."type" AS "testType",
                T.DEADLINE AS "testDeadline",
                U."name" AS "testCreator",
                T.PAYMENT AS "testPayment"
FROM "Tests" T,
     "Users" U,
     "Selection_Criteria" C
  WHERE T."isPublic" = TRUE
    AND T."isDeleted" = FALSE
    AND T."userId" = U.ID
    AND C."testId" = T.ID
-----------------------------------
    AND C."ageRange" @= 30
    AND C."gender" = 'Male'
    AND C."location" = 'Porto'
    AND C."digitalSavviness" = 1
    AND C."hobbies" && ARRAY['asda','asd']::text[]
    --AND ANY(C."careers") = ''
    --AND C."careers" @> ''
    
     

SELECT T.ID,
      T."name" AS "testName",
      T."type" AS "testType",
      T.DEADLINE AS "testDeadline",
      U."name" AS "testCreator",
      T.PAYMENT AS "testPayment"
FROM "Tests" T,
      "Users" U,
      "Selection_Criteria" C,
      "Testers" TT,
      "Users" UTT
WHERE T."isPublic" = TRUE
      AND T."isDeleted" = FALSE
      AND T."userId" = U.ID
      AND C."testId" = T.ID
      AND TT."userId" = ${userId}
      AND C."ageRange" @= date_part('year',age(TT.birthDate))
      AND C."gender" = TT.gender
      AND C."digitalSavviness" = TT.digitalSavviness
      AND C."hobbies" && TT.hobbies
      
      AND TT."userId" = UTT.ID
      AND C."location" = UTT.location
      AND C."careers" @> UTT.career

      --------------------


      SELECT T.ID,
      T."name" AS "testName",
      T."type" AS "testType",
      T.DEADLINE AS "testDeadline",
      U."name" AS "testCreator",
      T.PAYMENT AS "testPayment"
FROM "Tests" T,
      "Users" U,
      "Selection_Criteria" C,
      "Testers" TT,
      "Users" UTT
WHERE T."isPublic" = TRUE
      AND T."isDeleted" = FALSE
      AND T."userId" = U.ID
      AND C."testId" = T.ID
      AND TT."userId" = 20
      


-------------------------


SELECT T.ID,
      T."name" AS "testName",
      T."type" AS "testType",
      T.DEADLINE AS "testDeadline",
      U."name" AS "testCreator",
      T.PAYMENT AS "testPayment"
FROM "Tests" T
LEFT JOIN "Users" U ON T."userId" = U.ID
LEFT JOIN "Selection_Criteria" C ON C."testId" = T.ID
LEFT JOIN "Testers" TT ON TT."userId" = ${userId}
LEFT JOIN "Users" UTT ON TT."userId" = UTT.ID
WHERE T."isPublic" = TRUE
      AND T."isDeleted" = FALSE
      
      AND date_part('year',age(TT."birthDate"))::integer <@ C."ageRange"
      AND C."gender" = TT.gender
      AND C."digitalSavviness" = TT."digitalSavviness"
      AND C."hobbies" && TT.hobbies
      
      AND C."location" = UTT.location
      AND C."careers" @> ARRAY[UTT.career]