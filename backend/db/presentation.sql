\c organise_production

DELETE FROM activist;

INSERT INTO activist (id, email, name)
VALUES
(1, 'tester@test.com', 'Testy McTestFace'),
(2, 'jeremy.corbyn@parliament.uk', 'Jeremy Corbyn'),
(3, 'ice@t.com', 'Ice-T'),
(4, 'pinkie@pie.co.uk', 'Pinkie Pie'),
(5, 'paris.lees@hotmail.co.uk', 'Paris Lees'),
(6, 'angela.rayner@parliament.uk', 'Angela Rayner'),
(7, 'billy@bragg.com', 'Billy Bragg'),
(8, 'nigella@lawson.food', 'Nigella Lawson'),
(9, 'britney@spears.com', 'Britney Spears'),
(10, 'trent@nin.com', 'Trent Reznor'),
(11, 'immortal@tech.com', 'Immortal Technique'),
(12, 'sue@mcmahon.com', 'Sue McMahon')

;

DELETE FROM campaign;
INSERT INTO campaign (id, name, description, logo)
VALUES
(1, 'Stop Brexit', 'We need to tweet a LOT more, folks',
'http://organise-presentation-images.s3-website.eu-west-2.amazonaws.com/eu.fist.png'),
(2, 'Calderdale Against School Cuts',
'Schools are really struggling. Loads of redundancies. Cannot afford books. Total Disgrace. We want to raise awareness and put pressure on Government to stop this.',
'http://organise-presentation-images.s3-website.eu-west-2.amazonaws.com/casc.png'),
(3,''
'Freeciv for the Northcoders Community',
'We could have a huge game played at glacial pace. Bagsy being Venice!',
'http://organise-presentation-images.s3-website.eu-west-2.amazonaws.com/freeciv.png'),
(4, 'More jam makers in Tech', 'Just because we can preserve the separation of concerns, it doesn''t mean that we can all make quality preserves' , 'http://organise-presentation-images.s3-website.eu-west-2.amazonaws.com/jam.jpg'),
(5, 'Vim for All',
'Children, if they learn to code at all, don''t learn to code using classic UNIX modal editors. This needs to change. Schools don''t need ipads or Chromebooks, they need Vim!',
'http://organise-presentation-images.s3-website.eu-west-2.amazonaws.com/vim.png'),
(6, 'Heavy Metal National Anthem',
'Why is the national anthem so unawesome? It needs to be METAL. We will lobby the head of state till this is achieved',
'http://organise-presentation-images.s3-website.eu-west-2.amazonaws.com/horns.jpeg');

DELETE FROM membership;
INSERT INTO membership (id, activist_id, campaign_id, membership)
VALUES
(4,12,2, 'admin'),
(5,6,2,'member'),
(6,3,2,'member'),
(7,2,2,'member'),

(1, 5, 4, 'admin'),
(2, 6, 4, 'member'),
(3, 8, 4, 'member'),
(8, 9, 4, 'member'),
(9, 10, 4, 'member'),
(10, 11, 4, 'member'),
(11, 2, 4, 'member'),


(12, 1, 1, 'admin'),
(13, 1, 2, 'member'),
(14, 1, 3, 'member'),
(15, 1, 4, 'admin'),


(16, 1, 5, 'admin')

;

DELETE FROM task;
INSERT INTO task (id, campaign_id, instructions, due_date)
VALUES
(1, 4, 'Make some special React jam', '2018-08-01'),
(2, 4, 'Lobby your MP about tech-jam', '2018-08-25'),
(3, 4, 'Write a small novel about the co-founder of a jam startup.', '2018-12-25')
;

DELETE FROM task_completion;
INSERT INTO task_completion (activist_id, task_id)
VALUES
(5,1),(6,1),(8,1),(9,1),(2,1),

(6,3)



;