const query = {
  getMediaFilesList: (LIMIT: number = 10, OFFSET: number = 0): string => `
    SELECT 
      media.m_id AS id, 
      media.m_title AS title, 
      media.m_file AS file, 
      media.m_creation_date AS "creationDate", 
      u_name AS author
    FROM 
      media
    INNER JOIN 
      users
    ON
      media.m_author = users.u_id
    ORDER BY 
      media.m_creation_date 
    DESC
    LIMIT ${LIMIT}
    OFFSET ${OFFSET}
    `,
  getMediaFilesCount: `
    SELECT count(*) FROM media
  `,
  getMediaFileById: (itemId: number): string => `
    SELECT 
      media.m_id AS id, 
      media.m_title AS title, 
      media.m_file AS file, 
      media.m_creation_date AS "creationDate", 
      u_name as author
    FROM 
      media
    INNER JOIN 
      users
    ON
      media.m_author = users.u_id
    WHERE 
      media.m_id = ${itemId}
  `,
  addImage: (title: string, creationDate: string, file: string, author: number) => `
    INSERT INTO
      media (m_title, m_file, m_creation_date, m_author)
    VALUES
      ('${title}', '${file}', '${creationDate}', ${author})
  `,
  getMediaFileComments: (fileId: number, LIMIT: number = 10, OFFSET: number = 0) => `
    SELECT 
      c_id AS id, 
      c_body AS body, 
      u_name AS author, 
      c_creation_date AS "creationDate"
    FROM 
      media_comments
    INNER JOIN 
      users
    ON
      media_comments.c_author = users.u_id
    WHERE 
      c_media_id = ${fileId}
    ORDER BY 
      media_comments.c_creation_date 
    DESC
    LIMIT ${LIMIT}
    OFFSET ${OFFSET}
    `,
  getMediaFileCommentsCount: `
      SELECT count(*) FROM media_comments
    `,
  addComment: (
    fileId: number,
    commentBody: string,
    commentAuthor: number,
    creationDate: string
  ) => `
      INSERT INTO 
        media_comments (c_body, c_author, c_media_id, c_creation_date)
      VALUES
        ('${commentBody}', ${commentAuthor}, ${fileId}, '${creationDate}')
    `,
  deleteMediaFile: (fileId: number) => `
      DELETE FROM 
        media 
      WHERE 
        m_id = ${fileId}
    `
};

export default query;
