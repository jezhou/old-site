---
layout: post
title:  "Quick way to do Two's Complement"
date:   2016-01-23
categories: blog tutorial helpful
---

This might be relatively simple to figure out by one's self, but this has definitely helped me save a lot of time on exams and I think it's worth explicitly writing about. So here it is!

So, what is Two's Complement? Essentially, it's an ingenious way of representing negative numbers using only the numbers 1 and 0. This is very useful because when it comes down to it, all modern day computers use 1's and 0's for all of their calculations, so it's handy to be able to calculate things using negative numbers!

So how does Two's Complement work, let's say for the number `-29`? The first step is to take the absolute value of the number and represent it in binary form. Then, simply invert the bits and add one.

    29 in binary form (Using 8 bits only):

    0 0 0 1   1 1 0 1

    Invert the bits:

    1 1 1 0   0 0 1 0

    Add one:

    1 1 1 0   0 0 1 1 ---> Two's Complement form of -29!

So what's the advantage of using Two's Complement? Well, it makes calculations involving negative and positive numbers REALLY FAST, since everything just boils down to simple bit operations. For example, if you added `29 + -29`:

    Addition:
    0 0 0 1   1 1 0 1
    1 1 1 0   0 0 1 1
    -------------------
    0 0 0 0   0 0 0 0 (With an overflow of 1)

If you ignore the overflow in this case, you would have 0 as the outcome. Because Two's Complement makes everything so convenient, it is regarded as a universal way of storing negative numbers in binary notation. In fact, I would say it would be pretty hard to find a computer that didn't use Two's Complement these days.

## So how do we do it faster?

Good question. Let's first ask ourselves what the calculation involves:

  1. Get the positive, absolute value of the negative number in binary notation.
  2. Invert the bits.
  3. Add one.

Okay, seems pretty straightforward. Writing the positive absolute value in binary is relatively trivial if you [keep dividing the number by 2](http://interactivepython.org/runestone/static/pythonds/BasicDS/ConvertingDecimalNumberstoBinaryNumbers.html) repeatedly and saving the remainders as you go. There's probably no easy way around the conversion, so we'll leave that there for now.

What about the last two parts, inverting and then adding 1? Inversion and adding one themselves are trivial, and sure, you can do both, but notice what happens when you add one to an already inverted number:

    0 1 0 0 ---> 4
    1 0 1 1 ---> ~4
    0 1 0 0 ---> ~4 + 1  (ignoring overflow of 1)

That's right, you end up getting the number you originally started with, ignoring overflow! So, the critical question here is that if adding one to an inverted number returns the original number, **why would you invert this number if it doesn't need to be inverted?**

It's a little hard to see where I'm going at here, so let's apply this observation to another example, let's say `-16`.

    0 0 0 1   0 0 0 0 ---> Step one
    1 1 1 0   1 1 1 1 ---> Step two
    1 1 1 1   0 0 0 0 ---> Step three, -16 in two's comp

Let's compare `-16` in Two's Complement with `16` in binary form. We'll use a **XNOR** function to pick out only the bits that match each other:

    0 0 0 1   0 0 0 0
    1 1 1 1   0 0 0 0
    -----------------
    0 0 0 1   1 1 1 1 ---> Observe this number    

**Here is the critical observation:** it looks like that the places with 1 as a bit are the bits that go unchanged in the Two's Complement conversion. These bits happen to be where *the last 1 bit is in the absolute binary form, going from left to right*. Everything up to that one bit seems like it is inverted.

## TL;DR

So, let's revise the Two's Complement algorithm using this heuristic.

  1. Get the positive, absolute value of the negative number in binary notation.
  2. Invert all of the bits *up until the last one bit going left to right, exclusive*. Do not flip the rest of the bits.

Let's try this with `-28`:

    0 0 0 1   1 1 0 0 ---> 29
                ^     ---> the last one!

    1 1 1 0   0 1 0 0 ---> -29 using new heuristic
    ^ ^ ^ ^   ^       ---> Flip all of these bits!

    1 1 1 0   0 1 0 0 ---> -29 using normal Two's Complement algorithm

Well, it looks like this heuristic works for `-28`, but will it work for any number *n*? Well, not using a formal proof, any number you flip and add 1 to will become the original number, with an overflow of 1. So if you go to the last 1 bit when examining a binary number (going from left to right), you can treat that 1 as the overflow to the bits you are keeping consistent. That's why you only need to invert part of a number up up to it's last 1 bit: if those bits are going to stay the same anyway, there's no point in flipping those bits at all!

Since this will work for any binary number, we can change this from a heuristic to an algorithm :)

Some more examples:

    -64:  0 1 0 0   0 0 0 0 ---> 1 1 0 0   0 0 0 0  
    -51:  0 0 1 1   0 0 1 1 ---> 1 1 0 0   1 1 0 1
    -1:   0 0 0 0   0 0 0 1 ---> 1 1 1 1   1 1 1 1
    ... etc

Hope this will save you some time on exams! (Or the times you actually need to calculate Two's Complement, haha.)

Note: Shout out to my CSE 30 Professor Rick Ord for opening my eyes to this in like 2014 ^.^
