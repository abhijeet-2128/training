SELECT comments.contents, users.username
FROM comments
JOIN users ON comments.user_id = users.id
WHERE comments.photo_id = 3;
--first

SELECT AVG(comment_count)
FROM (
 SELECT COUNT(*) AS comment_count
 FROM comments
 GROUP BY photo_id
) AS counts;
--second

SELECT photos.id, photos.url, COUNT(*) AS comment_count
FROM photos
JOIN comments ON photos.id = comments.photo_id
GROUP BY photos.id
ORDER BY comment_count DESC
LIMIT 1;
--third

SELECT COUNT(*) AS comment_count
FROM photos
JOIN comments ON photos.id = comments.photo_id
WHERE photos.id = 10;
--fourth

SELECT users.id, users.username, COUNT(DISTINCT photos.id) + COUNT(DISTINCT comments.id) AS activity_count
FROM users
LEFT JOIN photos ON users.id = photos.user_id
LEFT JOIN comments ON users.id = comments.user_id
GROUP BY users.id
ORDER BY activity_count DESC
LIMIT 1;
--fifth


SELECT AVG(LENGTH(contents)) AS avg_comment_length
FROM comments;
--SIXTH