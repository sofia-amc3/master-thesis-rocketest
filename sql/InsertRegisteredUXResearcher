WITH tmpUsers AS (
  INSERT INTO "Users"
    (email, password, name, career, location, profilePhoto, type)
  VALUES
    ('${email}','${password}','${name}','${jobTitle}','${location}','${profilePhoto}', 0)
  RETURNING id)
INSERT INTO "UX_Researchers"
  (userId, isCompany, website, description)
SELECT id, '${isCompany}', '${website}', '${description}'
FROM tmpUsers;