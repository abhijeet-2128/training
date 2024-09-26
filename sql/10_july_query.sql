-- Find all the comments for the photo with ID = 3, along with the username of the comment author

SELECT comments.contents, users.username
FROM comments
JOIN users ON comments.user_id = users.id
WHERE comments.photo_id = 3;
--first

-- Find the average number of comments per photo

SELECT AVG(comment_count)
FROM (
 SELECT COUNT(*) AS comment_count
 FROM comments
 GROUP BY photo_id
) AS counts;
--second


-- Find the photo with the most comments attached to it
SELECT photos.id, photos.url, COUNT(*) AS comment_count
FROM photos
JOIN comments ON photos.id = comments.photo_id
GROUP BY photos.id
ORDER BY comment_count DESC
LIMIT 1;
--third

-- Find the photo with ID = 10 and get the number of comments attached to it
SELECT COUNT(*) AS comment_count
FROM photos
JOIN comments ON photos.id = comments.photo_id
WHERE photos.id = 10;
--fourth

-- Find the user with the most activity (most comments + most photos)
SELECT users.id, users.username, COUNT(DISTINCT photos.id) + COUNT(DISTINCT comments.id) AS activity_count
FROM users
LEFT JOIN photos ON users.id = photos.user_id
LEFT JOIN comments ON users.id = comments.user_id
GROUP BY users.id
ORDER BY activity_count DESC
LIMIT 1;
--fifth

-- Calculate the average number of characters per comment
SELECT AVG(LENGTH(contents)) AS avg_comment_length
FROM comments;
--SIXTH